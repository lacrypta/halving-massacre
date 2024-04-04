import { Button, Container, Divider, Flex, Heading, Sheet, Text } from '@lawallet/ui';
import Link from 'next/link';
import { appTheme } from '../../../config/exports';

const LightingAddressSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Sheet title={'¿Qué es Lightning Address?'} isOpen={isOpen} closeText={'Cerrar'} onClose={onClose}>
      <Container>
        <Text isBold>Como una dirección de correo electrónico, ¡pero para Bitcoin!</Text>

        <Divider y={16} />

        <Text>
          Una forma enormemente más sencilla para que cualquiera pueda enviarte Bitcoin al instante en Lightning
          Network.
        </Text>

        <Divider y={16} />

        <Flex direction="column" justify="center" align="center" gap={4}>
          <Text color={appTheme.colors.gray50} size="small">
            Ejemplo:
          </Text>
          <Flex justify="center">
            <Text isBold>usuario</Text>
            <Text isBold color={appTheme.colors.primary}>
              @lawallet.ar
            </Text>
          </Flex>
        </Flex>

        <Divider y={16} />

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
