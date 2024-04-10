// Libraries
import { useEffect, useState } from 'react';
import { Button, Divider, Flex, Input, InputGroup, InputGroupRight, Text } from '@lawallet/ui';
import { getProviders, getProviderById } from 'sats-connect';

// Context
import { useNotifications } from '@/../context/NotificationsContext';

// Generic components
import { QRStyled } from '../QRCode';

// Hooks
import { usePlayer } from '@/../hooks/usePlayer';
import { copy } from '@/../utils/share';
import { useSubscription } from '@lawallet/react';

// Theme
import { appTheme } from '@/../config/exports';
import { useTranslations } from 'next-intl';

// Config
const URLX_PUBKEY = process.env.NEXT_PUBLIC_URLX_PUBKEY!;

// Sats Connect
const providers = getProviders();
const satsConnectProvider = providers[0];

type InvoiceInfoProps = {
  pr: string;
  expiry: Date | null;
};

interface PowerProps {
  changeTitle: (value: string) => void;
  changeDescription: (value: string) => void;
}

// Mock
// const btcAddress = 'bc1prt2ca50dugw4wc64lg2pz2t7r5gvh7cuduuwdy78garkt5y4pfesypn5ud';
const btcAddress = '';

const PowerOnchain = (props: PowerProps) => {
  const { changeTitle, changeDescription } = props;

  const t = useTranslations();
  const notifications = useNotifications();

  const [eventIdReference, setEventIdReference] = useState<string>();
  // const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isPaying, setIsPaying] = useState<boolean>(false);
  // const [typePower, setTypePower] = useState<null | string>(null);

  // Subscription to the zap events
  const { events: zaps, subscription } = useSubscription({
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

  // Unsubscribe on unmount
  useEffect(() => {
    return () => {
      if (subscription) {
        subscription.stop();
      }
    };
  }, [subscription]);

  // Change title if user have address for onchain
  useEffect(() => {
    if (btcAddress) {
      changeTitle('Agregar via Onchain');
      changeDescription('algo');
    } else {
      changeTitle('Habilitar Onchain');
      changeDescription('Adquiri nuestro ticket especial para agregar poder a lo grande.');
    }
  }, [btcAddress]);

  const payWithSatsConnect = async (address: string) => {
    const providerObject = getProviderById(satsConnectProvider!.id);

    const amount = 1000000;
    const response = await providerObject.request('sendTransfer', {
      recipients: [
        {
          address: address,
          amount: Number(amount),
        },
      ],
    });
    console.dir('response', response);
  };

  const handleCopy = (text: string) => {
    copy(text).then((res) => {
      notifications.showAlert({
        description: res ? t('SUCCESS_COPY') : t('ERROR_COPY'),
        type: res ? 'success' : 'error',
      });
    });
  };

  // Mock
  const [hasTicket, setHasTicket] = useState<boolean>(false);

  const handleGenerateTicketOnchain = () => {
    setHasTicket(!hasTicket);
  };

  return (
    <>
      {!btcAddress && (
        <>
          <Flex gap={4} justify="center" align="center">
            <Text size="small" color={appTheme.colors.gray50}>
              Valor:
            </Text>
            <Text isBold>2.100 SAT</Text>
          </Flex>
          <Divider y={8} />
        </>
      )}

      {btcAddress ? (
        <>
          <Flex justify="center">
            <QRStyled size={250} value={btcAddress} />
          </Flex>
          <Divider y={8} />
          <Text size="small" color={appTheme.colors.gray50}>
            Billetera de Onchain
          </Text>
          {/* neeeds readonly */}
          <InputGroup>
            <Input placeholder="" value={btcAddress} />
            <InputGroupRight>
              <Button size="small" variant="borderless" onClick={() => handleCopy(btcAddress)}>
                Copiar
              </Button>
            </InputGroupRight>
          </InputGroup>
          {satsConnectProvider && (
            <Button onClick={() => payWithSatsConnect(btcAddress)} variant="bezeled" disabled={isPaying}>
              Pagar con SatsConnect
            </Button>
          )}
        </>
      ) : hasTicket ? (
        <Flex justify="center" align="center" direction="column" gap={8}>
          <QRStyled size={250} value={'cambiar-qr-ticket'} />
          <Text size="small" color={appTheme.colors.gray50}>
            Disponible por 10min, 15seg.
          </Text>
        </Flex>
      ) : (
        <Button onClick={handleGenerateTicketOnchain}>Generar ticket</Button>
      )}
    </>
  );
};

export default PowerOnchain;
