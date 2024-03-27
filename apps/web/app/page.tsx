"use client";

import {
  BannerAlert,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
} from "@lawallet/ui";
import { appTheme } from "../config/exports";

export default function Page(): JSX.Element {
  return (
    <>
      <Container>
        <Divider y={40} />
        <Heading align='center'>Halving Massacre</Heading>
        <Divider y={10} />
        <Text>
          Sobreviví todas las rondas y ganá el pozo acumulado más 2.100.000 sats
        </Text>
        <Divider y={20} />
        <Flex direction='row'>
          <Button>Anotarme ahora</Button>
        </Flex>
        <Text size='small' align='center' color={appTheme.colors.success}>
          Las inscripciones cierran en 21 días, 14 horas y 15 minutos
        </Text>

        <Divider y={20} />

        <div>Íconos</div>

        <Divider y={20} />

        <Flex direction='column' gap={8}>
          <Flex direction='row' gap={8}>
            <BannerAlert title='1' description='Ganador' />
            <BannerAlert title='25' description='participantes' />
          </Flex>
          <Flex direction='row'>
            <BannerAlert title='2.1M sats' description='Premio Inicial' />
          </Flex>
        </Flex>

        <Divider y={20} />

        <Heading align='center' as='h3'>
          Participantes
        </Heading>
      </Container>
    </>
  );
}
