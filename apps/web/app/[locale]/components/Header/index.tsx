import { Heading, Divider, Text, Flex } from '@lawallet/ui';

import { HeaderPrimitive } from './style';
import { useTranslations } from 'next-intl';

import pngLogo from '../../../../public/logo.png';
import Image from 'next/image';

export default function Header() {
  const t = useTranslations();

  return (
    <HeaderPrimitive>
      <Flex align="center" justify="center" direction="column">
        <Image width={240} height={77} alt="Halving Massacre by La Crypta" src={pngLogo.src} />
        <Divider y={12} />
        <Text align="center">{t('HEADER_DESC')}</Text>
      </Flex>
    </HeaderPrimitive>
  );
}
