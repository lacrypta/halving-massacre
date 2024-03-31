import { Button, Container, Divider, Flex, Heading, Sheet, Text } from '@lawallet/ui';
import Link from 'next/link';

const LightingAddressSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Sheet title={''} isOpen={isOpen} closeText={'Cerrar'} onClose={onClose}>
      {/* <Flex align="center" justify="center"> */}
      <Heading as="h3" align="center">
        ¿Qué es Lightning Address?
      </Heading>

      <Divider y={20} />

      <Container>
        <Text align="center" isBold>
          Como una dirección de correo electrónico, ¡pero para Bitcoin!
        </Text>

        <Divider y={20} />

        <Text align="center">
          Una forma enormemente más sencilla para que cualquiera pueda enviarle Bitcoin al instante en Lightning
          Network.
        </Text>

        <Divider y={20} />

        <Text align="center">usuario@lawallet.ar</Text>

        <Divider y={20} />

        <Flex direction="column" align="center">
          <Link href="https://app.lawallet.ar/signup" rel="noopener noreferrer" target="_blank">
            <Button>Obtener el mio</Button>
          </Link>
        </Flex>
      </Container>
    </Sheet>
  );
};

export default LightingAddressSheet;
