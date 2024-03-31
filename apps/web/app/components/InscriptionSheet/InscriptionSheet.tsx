import { ActionSheet, Button, Container, Divider, Flex, Heading, Text } from '@lawallet/ui';
import { useState } from 'react';
import Payment from './Payment';
import RulesSheet from '../Rules/RulesSheet';

const InscriptionSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [invoicePayment, setInvoicePayment] = useState<string>('');

  const handleClick = () => {
    setInvoicePayment('prueba');
  };

  const restartModal = () => {
    setInvoicePayment('');
    onClose();
  };

  return (
    <ActionSheet isOpen={isOpen} description="" onClose={restartModal} cancelText="Cancelar">
      {!invoicePayment ? (
        <>
          <Container>
            <Flex flex={1} justify="center" align="center" direction="column">
              <Heading as="h3">Comprá tu ticket</Heading>

              <Divider y={24} />

              <Text>
                El ticket cuesta <b>210 sats</b> (por única vez).
              </Text>
              <Divider y={20} />
              <Text>
                Se te agrega <b>1 sat de poder</b>
              </Text>
              <Divider y={20} />
              <Text>Podes seguir agregando poder cuando quieras mientras sigas vivo</Text>

              <Divider y={12} />
            </Flex>

            <Divider y={12} />

            <Flex flex={1} direction="row" align="center" justify="center">
              <Button onClick={handleClick}>Anotarme</Button>
            </Flex>

            <Divider y={6} />

            <Flex flex={1} direction="row" align="center" justify="center" onClick={() => setIsRulesOpen(true)}>
              <Text size="small" color="#56B68C">
                Ver reglamento
              </Text>
            </Flex>
          </Container>

          <RulesSheet isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
        </>
      ) : (
        <Payment invoice={invoicePayment} />
      )}
    </ActionSheet>
  );
};

export default InscriptionSheet;
