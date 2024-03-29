'use client';

import React, { useState } from 'react';
import { Avatar, AvatarImage, BannerAlert, Button, Container, Divider, Flex, Heading, Text } from '@lawallet/ui';
import Image from 'next/image';

import { appTheme } from '../config/exports';
import InscriptionSheet from './components/InscriptionSheet/InscriptionSheet';
import Card from './components/Card';

const PARTICIPANTES = ['fer@lawallet.ar', 'dios@lawallet.ar', 'agustin@lawallet.ar'];

export default function Page(): JSX.Element {
  const [openInscription, setOpenInscription] = useState<boolean>(false);

  return (
    <>
      <Divider y={64} />
      <Container>
        <Heading align='center'>Halving Massacre</Heading>
        <Divider y={12} />
        <Text align='center'>
          Sobrevivi todas las rondas seguidas aumentando tu poder de minado con Satoshis y gana el increible premio del
          pozo acumulado.
        </Text>

        <Divider y={16} />
        <Flex>
          <Button onClick={() => setOpenInscription(true)}>Anotarme ahora</Button>
        </Flex>
        <Divider y={8} />
        <Text align='center' color={appTheme.colors.success}>
          Las inscripciones cierran en 21 días, 14 horas y 15 minutos
        </Text>
        <Divider y={16} />

        <Flex direction='column' gap={8}>
          <Flex direction='row' gap={8}>
            <Card image='/emotes/crown.png'>
              <Heading as='h2'>1</Heading>
              <Text color={appTheme.colors.gray50}>ganador.</Text>
            </Card>
            <Card image='/emotes/rocket.png'>
              <Heading as='h2'>25.000</Heading>
              <Text color={appTheme.colors.gray50}>participantes.</Text>
            </Card>
          </Flex>
          <Card image='/emotes/party.png' size='small'>
            <Heading as='h2'>2.100.000</Heading>
            <Text color={appTheme.colors.gray50}>SATs de premio inicial.</Text>
          </Card>
        </Flex>

        <Divider y={20} />

        <Heading align='center' as='h3'>
          Participantes
        </Heading>

        <Divider y={20} />

        {PARTICIPANTES.map((lud16: string) => (
          <React.Fragment key={lud16}>
            <Flex align='center' gap={8}>
              <Avatar>
                <AvatarImage src='/favicon.ico' alt='asd' />
              </Avatar>

              <Text>{lud16}</Text>
            </Flex>
            <Divider y={12} />
          </React.Fragment>
        ))}
      </Container>

      <InscriptionSheet isOpen={openInscription} onClose={() => setOpenInscription(false)} />
    </>
  );
}
