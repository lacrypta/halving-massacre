import { type ReactNode } from 'react';
import { Link } from '../../../../navigation';
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
              <Link href="/ranking">
                <Button size="small" variant="borderless">
                  Top 100
                </Button>
              </Link>

              <Link href="/rules">
                <Button size="small" variant="borderless">
                  {t('SEE_RULES')}
                </Button>
              </Link>

              <LocaleSwitcher />
            </Flex>
          </Flex>
        </Container>
      </NavbarStyle>
    </>
  );
}
