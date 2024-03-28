import {
  ActionSheet,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
} from "@lawallet/ui";
import { type ChangeEvent, useState } from "react";
import Link from "../Icons/Link";
import LightingAddressSheet from "./LightingAddressSheet";
import Payment from "./Payment";

const InscriptionSheet = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [openLNInfo, setOpenLNInfo] = useState(false);
  const [lnAddress, setLNAddress] = useState<string>("");
  const [invoicePayment, setInvoicePayment] = useState<string>("");

  const handleClick = () => {
    setInvoicePayment("prueba");
  };

  const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setLNAddress(address);
  };

  const restartModal = () => {
    setInvoicePayment("");
    setLNAddress("");
    onClose();
  };

  return (
    <ActionSheet
      isOpen={isOpen}
      description=""
      onClose={restartModal}
      cancelText="Cancelar"
    >
      {!invoicePayment ? (
        <>
          <Container>
            <Flex flex={1} justify="center" align="center" direction="column">
              <Heading as="h3">Anotate ahora</Heading>

              <Divider y={12} />

              <Text align="center">
                A message should be a short, complete sentence.
              </Text>

              <Divider y={12} />

              <Flex
                flex={1}
                direction="row"
                align="center"
                justify="center"
                onClick={() => setOpenLNInfo(true)}
              >
                <Text color="#56B68C">¿Qué es esto?</Text>
                <Link />
              </Flex>

              <Divider y={12} />

              <Input
                onChange={handleChangeAddress}
                placeholder="Lightning Address"
                value={lnAddress}
              />
            </Flex>

            <Divider y={12} />

            <Button onClick={handleClick}>Anotarme</Button>
          </Container>

          <LightingAddressSheet
            isOpen={openLNInfo}
            onClose={() => setOpenLNInfo(false)}
          />
        </>
      ) : (
        <Payment invoice={invoicePayment} />
      )}
    </ActionSheet>
  );
};

export default InscriptionSheet;
