import { Button, Divider, Flex, Input, Text } from '@lawallet/ui';
import { useCallback, useEffect, useState } from 'react';

// New ui-components
import { Icon } from '../Icon';
import { Loader } from '../Icons';

import { appTheme } from '@/../config/exports';

import { useActionOnKeypress } from '@/../hooks/useActionOnKeypress';
import { useNostrContext, useProfileCache } from '@lawallet/react';

import LightingAddressSheet from '../InscriptionSheet/LightingAddressSheet';

import CountdownBox from '../CountdownBox';
import { CountdownPrimitive } from './style';
import { useTranslations } from 'next-intl';
import { useRouter } from '../../../../navigation';
import { useSearchParams } from 'next/navigation';
import { useMassacre } from '../../../../hooks/useMassacre';

const NEXT_PUBLIC_TARGET_COUNTDOWN = process.env.NEXT_PUBLIC_TARGET_COUNTDOWN! || '2024-04-13T12:00:00';

const targetDate: Date = new Date(NEXT_PUBLIC_TARGET_COUNTDOWN);

export default function Countdown() {
  const router = useRouter();
  const [walias, setWalias] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [openLNInfo, setOpenLNInfo] = useState(false);

  const { ndk } = useNostrContext({});
  const { getLud16, getNip05 } = useProfileCache();

  const t = useTranslations();

  const { status } = useMassacre();

  const checkValidLightningAddress = useCallback(async () => {
    setIsLoading(true);

    const lud16 = await getLud16(walias);

    if (lud16) {
      router.push(`/profile/${walias}`);
      return;
    }

    const nip05 = await getNip05(walias);
    if (nip05?.lud06 || nip05?.lud16) {
      router.push(`/profile/${walias}`);
      return;
    }

    setIsLoading(false);
    setError(t('INVALID_LNURL_ERROR'));
  }, [walias]);

  const query = useSearchParams();

  useEffect(() => {
    const queryAddress = query.get('address');
    if (!queryAddress) return;

    setWalias(queryAddress);
  }, []);

  useActionOnKeypress('Enter', checkValidLightningAddress, [walias]);

  return (
    <>
      <CountdownPrimitive>
        {status === 'SETUP' && (
          <Text size="small" align="center" color={appTheme.colors.gray50}>
            {t('CLOSE_INSCRIPTION_IN')}
          </Text>
        )}

        <Divider y={8} />

        {status === 'SETUP' && <CountdownBox targetDate={targetDate} />}

        <Divider y={8} />
        <Input
          disabled={isLoading}
          value={walias}
          onChange={(e) => setWalias(e.target.value)}
          type="email"
          placeholder="Lightning Address"
        />
        <Divider y={8} />
        <Flex>
          <Button onClick={() => checkValidLightningAddress()} disabled={isLoading}>
            {isLoading ? (
              <Icon size={6}>
                <Loader />
              </Icon>
            ) : (
              t('INSCRIPTION_NOW')
            )}
          </Button>
        </Flex>

        {error && (
          <>
            <Divider y={4} />
            <Text size="small" align="center" color={appTheme.colors.error}>
              {error}
            </Text>
          </>
        )}

        <Flex>
          <Button variant="borderless" onClick={() => setOpenLNInfo(true)}>
            {t('WHAT_IS_THIS')}
          </Button>
        </Flex>
      </CountdownPrimitive>

      <LightingAddressSheet isOpen={openLNInfo} onClose={() => setOpenLNInfo(false)} />
    </>
  );
}
