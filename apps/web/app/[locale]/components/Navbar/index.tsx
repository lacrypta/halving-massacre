import { Button, Container, Flex } from '@lawallet/ui';
import { useTranslations } from 'next-intl';
import { type ReactNode } from 'react';
import { Link } from '../../../../navigation';

import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';
import { NavbarStyle } from './style';

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
            {children}
            <Flex gap={16} align="center" justify="end">
              <Link href="/ranking">
                <Button size="small" variant="borderless">
                  Top 100
                </Button>
              </Link>

              <Link href="/rules">
                <Button size="small" variant="borderless">
                  {t('RULES')}
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
