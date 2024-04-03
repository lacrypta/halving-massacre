import { ActionSheet, Button, Divider, Flex, Heading, Loader, Text } from '@lawallet/ui';
import { useEffect, useState } from 'react';
import RulesSheet from '../Rules/RulesSheet';
import { QRStyled } from '../QRCode';

// Types
import type {
  ErrorResponse as RequestErrorResponse,
  SuccessResponse as RequestSuccessResponse,
} from '@/api/ticket/request/route';
import type {
  ErrorResponse as ClaimErrorResponse,
  SuccessResponse as ClaimSuccessResponse,
} from '@/api/ticket/claim/route';
import { type Event } from 'nostr-tools';

// Hooks
import { useSubscription } from '@lawallet/react';
import { usePlayer } from '../../../hooks/usePlayer';

const URLX_PUBKEY = process.env.NEXT_PUBLIC_URLX_PUBKEY!;
const TICKET_PRICE = parseInt(process.env.NEXT_PUBLIC_TICKET_PRICE!);

const InscriptionSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isInvoiceLoading, setIsInvoiceLoading] = useState(false);
  const [invoicePayment, setInvoicePayment] = useState<string>('');
  const [eventIdReference, setEventIdReference] = useState<string>();
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const { walias } = usePlayer();

  // Subscription to the zap events
  const { events: zaps } = useSubscription({
    filters: [
      {
        kinds: [9735],
        authors: [URLX_PUBKEY],
        '#e': [eventIdReference || ''],
      },
    ],
    options: { closeOnEose: false, groupable: false },
    enabled: !!eventIdReference,
  });

  // detects new zap
  useEffect(() => {
    if (zaps.length === 0) {
      return;
    }
    onZap(zaps[0] as Event);
  }, [zaps]);

  const onZap = async (_zapReceipt: Event) => {
    // TODO: _zapReceipt is NDKEvent
    const zapReceipt = await (_zapReceipt as any).toNostrEvent();

    console.info('zapzapReceipt: ');
    console.dir(zapReceipt);

    // Claim the ticket to the url
    setIsPaid(true);
    await claimTicket(zapReceipt);
  };

  const handleClick = async () => {
    try {
      setIsInvoiceLoading(true);
      const res = await fetch('/api/ticket/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walias }),
      });
      const data = (await res.json()) as RequestSuccessResponse | RequestErrorResponse;
      if (data.success) {
        setEventIdReference(data.eTag);
        setInvoicePayment(data.pr);
        return;
      }
      throw new Error(data.error);
    } catch (e: unknown) {
      setIsInvoiceLoading(false);
      console.error((e as Error).message);
    }
  };

  const claimTicket = async (zap: Event) => {
    try {
      setIsClaiming(true);
      const res = await fetch('/api/ticket/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zap),
      });
      const data = (await res.json()) as ClaimSuccessResponse | ClaimErrorResponse;
      if (data.success) {
        console.info('%%%%% Ticket %%%%%');
        console.dir(data);
        setIsClaiming(false);
        return;
      }
      throw new Error(data.error);
    } catch (e: unknown) {
      console.error((e as Error).message);
      throw e;
    }
  };

  const payWithWebLN = async (invoice: string) => {
    try {
      setIsPaying(true);
      if (!window.webln) {
        throw new Error('WebLN not detected');
      }
      await window.webln.enable();
      await window.webln.sendPayment(invoice);
    } catch (e) {
      alert((e as Error).message);
      setIsPaying(false);
    }
  };

  const restartModal = () => {
    setInvoicePayment('');
    setEventIdReference(undefined);
    setIsInvoiceLoading(false);
    setIsPaid(false);
    setIsPaying(false);
    onClose();
  };

  return (
    <ActionSheet
      isOpen={isOpen}
      title="Comprá tu ticket"
      description="Para poder participar de la massacre necesitas adquirir un ticket. El pago se realiza una unica vez."
      onClose={restartModal}
      cancelText="Cancelar"
    >
      {!invoicePayment ? (
        !isInvoiceLoading ? (
          <>
            <Button onClick={handleClick}>Anotarme</Button>
            <Button onClick={() => setIsRulesOpen(true)} variant="borderless">
              Ver reglamento
            </Button>

            <RulesSheet isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
          </>
        ) : (
          <Flex direction="column" align="center" justify="center" gap={16}>
            <Divider y={32} />
            <Heading align="center" as="h4">
              Generando ticket
            </Heading>
            <Divider y={32} />
            <Loader />
            <Divider y={32} />
          </Flex>
        )
      ) : (
        <>
          <Flex direction="column" gap={8} align="center">
            {isPaid ? (
              <>
                <Flex gap={8} align="center" justify="center" direction="column">
                  {!isClaiming ? (
                    <>
                      <Divider y={100} />
                      <Heading as="h4">Ya tenes tu ticket</Heading>
                      <Text>Te regalamos 1 sat de poder</Text>
                      <Divider y={100} />
                    </>
                  ) : (
                    <>Esta claimeando...</>
                  )}
                </Flex>
              </>
            ) : (
              <>
                <Flex gap={4} align="center" justify="center">
                  <Text size="small">Valor de inscripcion:</Text>
                  <Text isBold>{TICKET_PRICE} SATs</Text>
                </Flex>
                <QRStyled size={250} value={invoicePayment} />
                <Text size="small" color="gray">
                  Disponible por 10 min, 15 seg.
                </Text>

                <Flex gap={8}>
                  <Button variant="borderless">Copiar</Button>
                  {window.webln && (
                    <Button onClick={() => payWithWebLN(invoicePayment)} variant="bezeled" disabled={isPaying}>
                      Pagar con Alby
                    </Button>
                  )}
                </Flex>
              </>
            )}
          </Flex>
        </>
      )}
    </ActionSheet>
  );
};

export default InscriptionSheet;
