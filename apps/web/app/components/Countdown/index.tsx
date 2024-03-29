import { useState } from 'react';
import { Flex, Button, Divider, Text, Heading } from '@lawallet/ui';

import InscriptionSheet from '../InscriptionSheet/InscriptionSheet';

import { appTheme } from '../../../config/exports';

import { CountdownPrimitive, NumbersBox } from './style';

export default function Countdown() {
  const [openInscription, setOpenInscription] = useState<boolean>(false);
  return (
    <>
      <CountdownPrimitive>
        <Text size='small' align='center' color={appTheme.colors.gray50}>
          Cierre de inscripcion en
        </Text>
        <Divider y={8} />
        <NumbersBox>
          <Flex direction='column' align='center'>
            <Heading as='h2'>12</Heading>
            <Text>Dias</Text>
          </Flex>
          <Flex direction='column' align='center'>
            <Heading as='h2'>16</Heading>
            <Text>Hrs</Text>
          </Flex>
          <Flex direction='column' align='center'>
            <Heading as='h2'>40</Heading>
            <Text>Min</Text>
          </Flex>
          <Flex direction='column' align='center'>
            <Heading as='h2'>30</Heading>
            <Text>Secs</Text>
          </Flex>
        </NumbersBox>
        <Divider y={8} />
        <Flex>
          <Button onClick={() => setOpenInscription(true)}>Anotarme ahora</Button>
        </Flex>
      </CountdownPrimitive>

      <InscriptionSheet isOpen={openInscription} onClose={() => setOpenInscription(false)} />
    </>
  );
}
