import { type ReactNode } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Container, Flex, Button } from '@lawallet/ui';

import { NavbarStyle } from './style';
import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';

interface NavbarProps {
  children?: ReactNode;
}

export function Navbar(props: NavbarProps) {
  const { children } = props;

  const t = useTranslations();

  return (
    <>
      <NavbarStyle>
        <Container>
          <Flex flex={1} align="center" justify="space-between">
            <Link href="/">{children}</Link>
            <Flex gap={16} align="center" justify="end">
              <div>
                <Link href="/rules">
                  <Button size="small" variant="borderless">
                    {t('SEE_RULES')}
                  </Button>
                </Link>
              </div>
              <LocaleSwitcher />
            </Flex>
          </Flex>
        </Container>
      </NavbarStyle>
    </>
  );
}
