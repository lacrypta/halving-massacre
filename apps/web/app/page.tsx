"use client";

import {
  Avatar,
  BannerAlert,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
} from "@lawallet/ui";
import React, { useState } from "react";
import { appTheme } from "../config/exports";
import InscriptionSheet from "./components/InscriptionSheet/InscriptionSheet";

const PARTICIPANTES = [
  "fer@lawallet.ar",
  "dios@lawallet.ar",
  "agustin@lawallet.ar",
];

export default function Page(): JSX.Element {
  const [openInscription, setOpenInscription] = useState<boolean>(false);

  return (
    <>
      <Container>
        <Divider y={40} />
        <Heading align="center">Halving Massacre</Heading>
        <Divider y={10} />
        <Text>
          Sobreviví todas las rondas y ganá el pozo acumulado más 2.100.000 sats
        </Text>
        <Divider y={20} />
        <Flex direction="row">
          <Button onClick={() => setOpenInscription(true)}>
            Anotarme ahora
          </Button>
        </Flex>
        <Divider y={16} />
        <Text size="small" align="center" color={appTheme.colors.success}>
          Las inscripciones cierran en 21 días, 14 horas y 15 minutos
        </Text>

        <Divider y={20} />

        <div>Íconos</div>

        <Divider y={20} />

        <Flex direction="column" gap={8}>
          <Flex direction="row" gap={8}>
            <BannerAlert title="1" description="Ganador" />
            <BannerAlert title="25" description="participantes" />
          </Flex>
          <Flex direction="row">
            <BannerAlert title="2.1M sats" description="Premio Inicial" />
          </Flex>
        </Flex>

        <Divider y={20} />

        <Heading align="center" as="h3">
          Participantes
        </Heading>

        <Divider y={20} />

        {PARTICIPANTES.map((lud16: string) => (
          <React.Fragment key={lud16}>
            <Flex align="center" gap={8}>
              <Avatar>{lud16.substring(0, 2).toUpperCase()}</Avatar>
              <Text>{lud16}</Text>
            </Flex>
            <Divider y={12} />
          </React.Fragment>
        ))}
      </Container>

      <InscriptionSheet
        isOpen={openInscription}
        onClose={() => setOpenInscription(false)}
      />
    </>
  );
}
