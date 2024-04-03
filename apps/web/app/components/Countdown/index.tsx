import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Divider, Flex, Input, Text } from '@lawallet/ui';

// New ui-components
import { Icon } from '@/components/Icon';
import { Loader } from '@/components/Icons';

import { appTheme } from '../../../config/exports';

import { useActionOnKeypress } from '../../../hooks/useActionOnKeypress';

import LightingAddressSheet from '../InscriptionSheet/LightingAddressSheet';

import { CountdownPrimitive } from './style';
import { resolveLud16 } from '../../../lib/utils';
import CountdownBox from '../CountdownBox';

const NEXT_PUBLIC_TARGET_COUNTDOWN = process.env.NEXT_PUBLIC_TARGET_COUNTDOWN! || '2024-04-13T12:00:00';

const targetDate: Date = new Date(NEXT_PUBLIC_TARGET_COUNTDOWN);

export default function Countdown() {
  const router = useRouter();
  const [walias, setWalias] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [openLNInfo, setOpenLNInfo] = useState(false);

  const checkValidLightningAddress = useCallback(async () => {
    setIsLoading(true);

    const lud16 = await resolveLud16(walias);

    if (!lud16) {
      setIsLoading(false);
      setError('Debes ingresar una LNURL válida');
      return;
    }

    router.push(`/profile/${walias}`);
  }, [walias]);

  useActionOnKeypress('Enter', checkValidLightningAddress, [walias]);

  return (
    <>
      <CountdownPrimitive>
        <Text size="small" align="center" color={appTheme.colors.gray50}>
          Cierre de inscripcion en
        </Text>
        <Divider y={8} />

        <CountdownBox targetDate={targetDate} />

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
              'Anotarme ahora'
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
            ¿Qué es esto?
          </Button>
        </Flex>
      </CountdownPrimitive>

      <LightingAddressSheet isOpen={openLNInfo} onClose={() => setOpenLNInfo(false)} />
    </>
  );
}
