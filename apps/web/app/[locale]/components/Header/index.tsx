import { Heading, Divider, Text } from '@lawallet/ui';

import { HeaderPrimitive } from './style';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations();

  return (
    <HeaderPrimitive>
      <Heading align="center">Halving Massacre</Heading>
      <Divider y={12} />
      <Text align="center">{t('HEADER_DESC')}</Text>
    </HeaderPrimitive>
  );
}
