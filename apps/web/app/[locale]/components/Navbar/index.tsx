import { useState } from 'react';
import { Button, Container, Flex, Icon, Text } from '@lawallet/ui';
import { useTranslations } from 'next-intl';
import { type ReactNode } from 'react';
import { Link } from '../../../../navigation';

import { appTheme } from '../../../../config/exports';

import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';
import { IsoAnimated } from '../IsoAnimated';
import { AutoAvatar } from '../AutoAvatar';
import { MenuBar } from '../Icons';

import {
  NavbarStyle,
  UserButton,
  UserButtonMenu,
  UserMenu,
  UserMenuBody,
  UserMenuFooter,
  UserMenuHead,
  UserMenuItem,
} from './style';
import { ArrowRight } from '../Icons/ArrowRight';

interface NavbarProps {
  children?: ReactNode;
  isoAnimated?: Boolean;
}

export function Navbar({ children, isoAnimated = true }: NavbarProps) {
  const t = useTranslations();

  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <NavbarStyle>
        <Container>
          <Flex flex={1} align="center" justify="space-between">
            {isoAnimated && (
              <Link href="/">
                <IsoAnimated />
              </Link>
            )}
            {children}
            <Flex gap={16} align="center" justify="end">
              <Link href="/ranking">
                <Button size="small" variant="borderless">
                  {t('RANKING')}
                </Button>
              </Link>

              <Link href="/rules">
                <Button size="small" variant="borderless">
                  {t('RULES')}
                </Button>
              </Link>

              {/* <LocaleSwitcher /> */}

              <UserButtonMenu>
                <UserButton $background={appTheme.colors.primary15} onClick={() => setShowMenu(!showMenu)}>
                  <Icon>
                    <MenuBar color={appTheme.colors.primary} />
                  </Icon>
                </UserButton>
                <UserMenu $show={showMenu}>
                  <UserMenuHead onClick={() => setShowMenu(!showMenu)}>
                    <Flex flex={1} align="center" gap={4}>
                      <AutoAvatar walias={'asd@lawallet.ar'} size={6} />
                      <Text color={appTheme.colors.gray50}>Desconocido</Text>
                    </Flex>
                    <Icon>
                      <MenuBar color={appTheme.colors.primary} />
                    </Icon>
                  </UserMenuHead>
                  <UserMenuBody>
                    {/* <Link href=""> */}
                    <UserMenuItem>
                      <Flex align="center">
                        <Text>Mi perfil</Text>
                      </Flex>
                      Ver
                    </UserMenuItem>
                    {/* </Link> */}
                    {/* <button> */}
                    <UserMenuItem>
                      <Flex align="center">
                        <Text>Idioma</Text>
                      </Flex>
                    </UserMenuItem>
                    {/* </button> */}
                  </UserMenuBody>
                  <UserMenuFooter>
                    <Link href="">
                      <Text>Idioma</Text>
                      <Flex flex={0} align="center">
                        <Text size="small" isBold color={appTheme.colors.primary}>
                          ES
                        </Text>
                        <Icon>
                          <ArrowRight color={appTheme.colors.primary} />
                        </Icon>
                      </Flex>
                    </Link>
                    <button>
                      <Text>Idioma</Text>
                      <Flex flex={0} align="center">
                        <Text size="small" isBold color={appTheme.colors.primary}>
                          ES
                        </Text>
                        <Icon>
                          <ArrowRight color={appTheme.colors.primary} />
                        </Icon>
                      </Flex>
                    </button>
                  </UserMenuFooter>
                </UserMenu>
              </UserButtonMenu>
            </Flex>
          </Flex>
        </Container>
      </NavbarStyle>
    </>
  );
}
