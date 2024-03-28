import {
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Sheet,
  Text,
} from "@lawallet/ui";
import { useState } from "react";

const LightingAddressSheet = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [invoice, setInvoice] = useState<string>("");
  console.log(invoice);

  return (
    <Sheet title={""} isOpen={isOpen} closeText={"Cerrar"} onClose={onClose}>
      {/* <Flex align="center" justify="center"> */}
      <Heading as="h3" align="center">
        ¿Qué es Lightning Address?
      </Heading>

      <Divider y={20} />

      <Container>
        <Text align="center" isBold>
          Como una dirección de correo electrónico, ¡pero para tu Bitcoin!
        </Text>

        <Divider y={20} />

        <Text align="center">
          Una forma enormemente más sencilla para que cualquiera pueda enviarle
          Bitcoin al instante en Lightning Network.
        </Text>

        <Divider y={20} />

        <Text align="center">usuario@lawallet.ar</Text>

        <Divider y={20} />

        <Flex direction="column" align="center">
          <Button onClick={() => setInvoice("prueba")}>Obtener el mio</Button>
        </Flex>
      </Container>
    </Sheet>
  );
};

export default LightingAddressSheet;
