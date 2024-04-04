'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Text, Button, Container, Flex, baseTheme as theme, Divider } from '@lawallet/ui';

import { Twitter, Github, Discord } from '../Icons';
import Eggs from '../Eggs';

import { FooterPrimitive } from './style';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();

  return (
    <FooterPrimitive>
      <Container>
        <div className="box">
          <Flex flex={1} justify="space-between" gap={16}>
            <div className="copy">
              <Flex align="center" gap={4}>
                <Text color={theme.colors.gray50}>{t('MADE_WITH')}</Text>
                <Eggs />
                <Text color={theme.colors.gray50}>{t('BY')}</Text>
              </Flex>
              <Divider y={8} />
              <Link href="https://lacrypta.ar/" target="_blank">
                <Image src="/images/la-crypta-logo.svg" alt="LaCrypta logo" width={135} height={30} />
              </Link>
            </div>
            <div className="social">
              <Link href="https://twitter.com/lawalletOk/" target="_blank">
                <Button variant="bezeled" tabIndex={-1}>
                  <Twitter />
                </Button>
              </Link>
              <Link href="https://github.com/lawalletio/" target="_blank">
                <Button variant="bezeled" tabIndex={-1}>
                  <Github />
                </Button>
              </Link>
              <Link href="https://discord.gg/skvz2HdcYJ" target="_blank">
                <Button variant="bezeled" tabIndex={-1}>
                  <Discord />
                </Button>
              </Link>
            </div>
          </Flex>
        </div>
      </Container>
    </FooterPrimitive>
  );
}
