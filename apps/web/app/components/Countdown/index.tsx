import { useCallback, useState } from 'react';
import { Flex, Button, Divider, Text, Heading, Input, Loader } from '@lawallet/ui';

import { appTheme } from '../../../config/exports';

import { CountdownPrimitive, NumbersBox } from './style';
import LightingAddressSheet from '../InscriptionSheet/LightingAddressSheet';
import Link from '../Icons/Link';
import { useRouter } from 'next/navigation';
import { useActionOnKeypress } from '../../../hooks/useActionOnKeypress';

export default function Countdown() {
  const router = useRouter();
  const [walias, setWalias] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [openLNInfo, setOpenLNInfo] = useState(false);

  const checkValidLightningAddress = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        if (walias === '') {
          setIsLoading(false);
          throw new Error('Debe ingresar un Lightning Address valido');
        }
        router.push(`/profile/${walias}`);
      } catch (error: unknown) {
        setIsLoading(false);
        setError((error as Error).message);
      }
    }, 2000);
  }, [walias]);

  useActionOnKeypress('Enter', checkValidLightningAddress, [walias]);

  return (
    <>
      <CountdownPrimitive>
        <Text size="small" align="center" color={appTheme.colors.gray50}>
          Cierre de inscripcion en
        </Text>
        <Divider y={8} />
        <NumbersBox>
          <Flex direction="column" align="center">
            <Heading as="h2">12</Heading>
            <Text>Dias</Text>
          </Flex>
          <Flex direction="column" align="center">
            <Heading as="h2">16</Heading>
            <Text>Hrs</Text>
          </Flex>
          <Flex direction="column" align="center">
            <Heading as="h2">40</Heading>
            <Text>Min</Text>
          </Flex>
          <Flex direction="column" align="center">
            <Heading as="h2">30</Heading>
            <Text>Secs</Text>
          </Flex>
        </NumbersBox>
        <Divider y={8} />
        <Input
          disabled={isLoading}
          value={walias}
          onChange={(e) => setWalias(e.target.value)}
          type="email"
          placeholder="Lightning Address"
        />
        <Divider y={4} />
        <Flex flex={1} direction="row" align="center" justify="center" onClick={() => setOpenLNInfo(true)}>
          <Text size="small" color="#56B68C">
            ¿Qué es esto?
          </Text>
          <Link />
        </Flex>
        <Divider y={8} />
        <Flex>
          {isLoading ? <Loader /> : <Button onClick={() => checkValidLightningAddress()}>Anotarme ahora</Button>}
        </Flex>
      </CountdownPrimitive>

      <LightingAddressSheet isOpen={openLNInfo} onClose={() => setOpenLNInfo(false)} />
    </>
  );
}
