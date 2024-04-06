// Libraries
import { ActionSheet, Button, Divider, Flex, Text } from '@lawallet/ui';
import { useEffect, useState } from 'react';

// Context
import { useNotifications } from '@/../context/NotificationsContext';

// Generic components
import { QRStyled } from '../QRCode';

// New ui-components
import { Icon } from '../Icon';
import { Loader } from '../Icons';

// Hooks
import { usePlayer } from '@/../hooks/usePlayer';
import { copy } from '@/../utils/share';
import { decodeInvoice, useSubscription } from '@lawallet/react';

// Theme
import { appTheme } from '@/../config/exports';
import { useTranslations } from 'next-intl';

// Types
import type { Event } from 'nostr-tools';
import type { RequestErrorResponse, RequestSuccessResponse } from '../../../../types/request';
import CountMinAndSec from '../CountdownBox/MinutesAndSeconds';

// Config
const URLX_PUBKEY = process.env.NEXT_PUBLIC_URLX_PUBKEY!;
const TICKET_PRICE = parseInt(process.env.NEXT_PUBLIC_TICKET_PRICE!);
const MASSACRE_SETUP_ID = process.env.NEXT_PUBLIC_MASSACRE_SETUP_ID!;
const MASSACRE_ENDPOINT = process.env.NEXT_PUBLIC_MASSACRE_ENDPOINT!;

type InvoiceInfoProps = {
  pr: string;
  expiry: Date | null;
};

const AddPowerSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const t = useTranslations();
  const notifications = useNotifications();

  const [isInvoiceLoading, setIsInvoiceLoading] = useState(false);
  const [amount, setAmount] = useState(1000);
  const [invoiceInfo, setInvoiceInfo] = useState<InvoiceInfoProps>({
    pr: '',
    expiry: null,
  });
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
      const res = await fetch(
        `${MASSACRE_ENDPOINT}/massacre/games/${MASSACRE_SETUP_ID}/power?amount=${amount}&walias=${walias}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = (await res.json()) as RequestSuccessResponse | RequestErrorResponse;
      if (data.success) {
        setEventIdReference(data.eTag);
        const decodedInvoice = decodeInvoice(data.pr);
        const invoiceExpiry =
          decodedInvoice && decodedInvoice.timeExpireDate ? new Date(decodedInvoice.timeExpireDate * 1000) : null;
        setInvoiceInfo({ pr: data.pr, expiry: invoiceExpiry });
        return;
      }
      alert(data.message);
      throw new Error(data.message);
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
    setInvoiceInfo({ pr: '', expiry: null });
    setEventIdReference(undefined);
    setIsInvoiceLoading(false);
    setIsPaid(false);
    setIsPaying(false);
    onClose();
  };

  const handleCopy = (text: string) => {
    copy(text).then((res) => {
      notifications.showAlert({
        description: res ? t('SUCCESS_COPY') : t('ERROR_COPY'),
        type: res ? 'success' : 'error',
      });
    });
  };

  return (
    <ActionSheet
      isOpen={isOpen}
      title={t('ADD_POWER')}
      description={t('ADD_POWER_DESC')}
      onClose={restartModal}
      cancelText={isPaid ? t('CLOSE') : t('CANCEL')}
    >
      {!invoiceInfo.pr ? (
        !isInvoiceLoading ? (
          <Button onClick={handleClick}>{t('ADD_POWER')}</Button>
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
                    {t('ADDED_POWER')}
                  </Text>
                  <Divider y={16} />
                </Flex>
              </>
            ) : (
              <>
                <Flex gap={4} align="center" justify="center">
                  <Text size="small">{t('INSCRIPTION_VALUE')}:</Text>
                  <Text isBold>{amount / 1000} SATs</Text>
                </Flex>
                <QRStyled size={250} value={invoiceInfo.pr} />
                {invoiceInfo.expiry && (
                  <Text size="small" color="gray">
                    {t('AVAILABLE_FOR')} <CountMinAndSec date={new Date(invoiceInfo.expiry)} onFinish={restartModal} />
                  </Text>
                )}

                <Flex gap={8}>
                  <Button variant="borderless" onClick={() => handleCopy(invoiceInfo.pr)}>
                    {t('COPY')}
                  </Button>
                  {window.webln && (
                    <Button onClick={() => payWithWebLN(invoiceInfo.pr)} variant="bezeled" disabled={isPaying}>
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

export default AddPowerSheet;
