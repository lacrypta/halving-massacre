import type { ReactNode } from 'react';
import { Container, Flex } from '@lawallet/ui';

import { NavbarStyle } from './style';
import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';

interface NavbarProps {
  children?: ReactNode;
}

export function Navbar(props: NavbarProps) {
  const { children } = props;

  return (
    <NavbarStyle>
      <Container>
        <Flex flex={1} align="center" justify="end">
          <LocaleSwitcher />
        </Flex>
      </Container>
    </NavbarStyle>
  );
}
