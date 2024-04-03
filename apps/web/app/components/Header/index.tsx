import { Heading, Divider, Text } from '@lawallet/ui';

import { HeaderPrimitive } from './style';

export default function Header() {
  return (
    <HeaderPrimitive>
      <Heading align="center">Halving Massacre</Heading>
      <Divider y={12} />
      <Text align="center">
        Sobrevivi todas las rondas seguidas aumentando tu poder de minado con Satoshis y ganá el increible premio del
        pozo acumulado.
      </Text>
    </HeaderPrimitive>
  );
}
