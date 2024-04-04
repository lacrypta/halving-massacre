// Libraries
import { ActionSheet, Button, Divider, Flex, Text } from '@lawallet/ui';
import { useEffect, useState } from 'react';

// Context
import { useNotifications } from '@/../context/NotificationsContext';

// Generic components
import { QRStyled } from '../QRCode';
import RulesSheet from '../Rules/RulesSheet';

// New ui-components
import { Icon } from '../Icon';
import { Loader } from '../Icons';

// Hooks
import { usePlayer } from '@/../hooks/usePlayer';
import { copy } from '@/../utils/share';
import { useSubscription } from '@lawallet/react';

// Theme
import { appTheme } from '@/../config/exports';
import { useTranslations } from 'next-intl';

// Types
import type { RequestErrorResponse, RequestSuccessResponse } from '../../../../types/request';
import type { Event } from 'nostr-tools';

// Config
const URLX_PUBKEY = process.env.NEXT_PUBLIC_URLX_PUBKEY!;
const TICKET_PRICE = parseInt(process.env.NEXT_PUBLIC_TICKET_PRICE!);
const MASSACRE_SETUP_ID = process.env.NEXT_PUBLIC_MASSACRE_SETUP_ID!;
const MASSACRE_ENDPOINT = process.env.NEXT_PUBLIC_MASSACRE_ENDPOINT!;

const InscriptionSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const notifications = useNotifications();

  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isInvoiceLoading, setIsInvoiceLoading] = useState(false);
  const [invoicePayment, setInvoicePayment] = useState<string>('');
  const [eventIdReference, setEventIdReference] = useState<string>();
  const [isPaid, setIsPaid] = useState<boolean>(false);
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
    // await claimTicket(zapReceipt);
  };

  const handleClick = async () => {
    try {
      setIsInvoiceLoading(true);

      // const res = await fetch('/api/ticket/request', {
      const res = await fetch(`${MASSACRE_ENDPOINT}/massacre/games/${MASSACRE_SETUP_ID}/tickets`, {
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

  const handleCopy = (text: string) => {
    copy(text).then((res) => {
      notifications.showAlert({
        description: res ? 'Texto copiado al portapapeles' : 'Ocurrió un error al copiar al portapapeles',
        type: res ? 'success' : 'error',
      });
    });
  };

  const t = useTranslations();

  return (
    <ActionSheet
      isOpen={isOpen}
      title={t('BUY_YOUR_TICKET')}
      description={t('BUY_TICKET_DESC')}
      onClose={restartModal}
      cancelText={isPaid ? t('CLOSE') : t('CANCEL')}
    >
      {!invoicePayment ? (
        !isInvoiceLoading ? (
          <>
            <Button onClick={handleClick}>{t('SIGN_UP')}</Button>
            <Button onClick={() => setIsRulesOpen(true)} variant="borderless">
              {t('SEE_RULES')}
            </Button>

            <RulesSheet isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
          </>
        ) : (
          <>
            <Divider y={16} />
            <Flex direction="column" align="center" justify="center" gap={8}>
              <Icon size={8}>
                <Loader />
              </Icon>
              <Text size="small" color={appTheme.colors.gray50}>
                {t('GENERATING_TICKET')}
              </Text>
            </Flex>
            <Divider y={16} />
          </>
        )
      ) : (
        <>
          <Flex direction="column" gap={8} align="center">
            {isPaid ? (
              <>
                <Flex gap={8} align="center" justify="center" direction="column">
                  <Divider y={16} />
                  <Text isBold color={appTheme.colors.primary}>
                    {t('HAVE_A_TICKET')}
                  </Text>
                  <Text size="small" color={appTheme.colors.gray50}>
                    {t('WE_GIVE_POWER')}
                  </Text>
                  <Divider y={16} />
                </Flex>
              </>
            ) : (
              <>
                <Flex gap={4} align="center" justify="center">
                  <Text size="small">{t('INSCRIPTION_VALUE')}:</Text>
                  <Text isBold>{TICKET_PRICE} SATs</Text>
                </Flex>
                <QRStyled size={250} value={invoicePayment} />
                <Text size="small" color="gray">
                  {t('AVAILABLE_FOR')} 10 min, 15 seg.
                </Text>

                <Flex gap={8}>
                  <Button variant="borderless" onClick={() => handleCopy(invoicePayment)}>
                    {t('COPY')}
                  </Button>
                  {window.webln && (
                    <Button onClick={() => payWithWebLN(invoicePayment)} variant="bezeled" disabled={isPaying}>
                      {t('PAY_WITH_ALBY')}
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
