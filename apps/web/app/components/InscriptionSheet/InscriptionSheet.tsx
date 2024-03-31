import { ActionSheet, Button, Flex, Text } from '@lawallet/ui';
import { useState } from 'react';
import RulesSheet from '../Rules/RulesSheet';
import { QRStyled } from '../QRCode';

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
    <ActionSheet
      isOpen={isOpen}
      title="Comprá tu ticket"
      description="Para poder participar de la massacre necesitas adquirir un ticket. El pago se realiza una unica vez."
      onClose={restartModal}
      cancelText="Cancelar"
    >
      {!invoicePayment ? (
        <>
          <Button onClick={handleClick}>Anotarme</Button>
          <Button onClick={() => setIsRulesOpen(true)} variant="borderless">
            Ver reglamento
          </Button>

          <RulesSheet isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
        </>
      ) : (
        <>
          <Flex direction="column" gap={8} align="center">
            <Flex gap={4} align="center" justify="center">
              <Text size="small">Valor de inscripcion:</Text>
              <Text isBold>210 SATs</Text>
            </Flex>
            <QRStyled size={250} value={invoicePayment} />
            <Text size="small" color="gray">
              Disponible por 10 min, 15 seg.
            </Text>
          </Flex>
        </>
      )}
    </ActionSheet>
  );
};

export default InscriptionSheet;
