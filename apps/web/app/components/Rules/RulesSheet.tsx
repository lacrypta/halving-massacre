import { Container, Divider, Heading, Sheet, Text } from '@lawallet/ui';

const RulesSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Sheet title={''} isOpen={isOpen} closeText={'Cerrar'} onClose={onClose}>
      <Heading as="h3" align="center">
        Reglas del juego
      </Heading>
      <Divider y={20} />
      <Container>
        <Text align="center" isBold>
          Como una dirección de correo electrónico, ¡pero para Bitcoin!
        </Text>

        <Divider y={20} />

        <Text align="center">
          El ticket cuesta <b>210 sats</b> (por única vez).
        </Text>
        <Divider y={20} />
        <Text align="center">
          Se te agrega <b>1 sat de poder</b>
        </Text>
        <Divider y={20} />
        <Text align="center">Podes seguir agregando poder cuando quieras mientras sigas vivo</Text>
      </Container>
    </Sheet>
  );
};

export default RulesSheet;
