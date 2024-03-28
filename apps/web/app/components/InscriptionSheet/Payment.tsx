import { Divider, Flex, Heading, Text } from "@lawallet/ui";
import { QRStyled } from "../QRCode";

const Payment = ({ invoice }: { invoice: string }) => {
  return (
    <>
      <Flex flex={1} justify="center" align="center" direction="column">
        <Heading as="h3">Último paso</Heading>

        <Divider y={12} />

        <Text align="center">
          El precio de inscripcion es de 100 SAT. No te olvides de pagarlo!
        </Text>

        <Divider y={12} />

        <QRStyled value={invoice} />

        <Divider y={12} />

        <Text color="gray">Disponible por 10 min, 15 seg.</Text>
      </Flex>
    </>
  );
};

export default Payment;
