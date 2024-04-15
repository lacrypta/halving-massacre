import { Button, Container, Flex, Text } from '@lawallet/ui';
import { useTranslations } from 'next-intl';
import { type ReactNode } from 'react';
import { Link } from '../../../../navigation';

import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';
import { NavbarStyle, SubnavbarStyle } from './style';
import { IsoAnimated } from '../IsoAnimated';
import { appTheme } from '../../../../config/exports';
import { useMassacre } from '../../../../hooks/useMassacre';

interface NavbarProps {
  children?: ReactNode;
  isoAnimated?: Boolean;
}

const EMERGENCY_LOCK_TICKET = process.env.EMERGENCY_LOCK_TICKET === 'true';
const EMERGENCY_LOCK_POWER = process.env.EMERGENCY_LOCK_POWER === 'true';

export function Navbar({ children, isoAnimated = true }: NavbarProps) {
  const t = useTranslations();
  const { status } = useMassacre();

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

              <LocaleSwitcher />
            </Flex>
          </Flex>
        </Container>
      </NavbarStyle>
      {EMERGENCY_LOCK_TICKET || EMERGENCY_LOCK_POWER ? (
        <SubnavbarStyle $background={appTheme.colors.error15}>
          <Container>
            <Flex flex={1} justify="center" align="center">
              <Text align="center" color={appTheme.colors.error}>
                {t('SERVICE_DOWN')}. {EMERGENCY_LOCK_TICKET && `${t('TICKET')} `}
                {EMERGENCY_LOCK_TICKET && EMERGENCY_LOCK_POWER && `${t('AND')} `}
                {EMERGENCY_LOCK_POWER && `${t('POWER')} `}
                {t('DISABLED')}.
              </Text>
            </Flex>
          </Container>
        </SubnavbarStyle>
      ) : null}
      {status === 'CLOSED' && (
        <SubnavbarStyle $background={appTheme.colors.warning15}>
          <Container>
            <Flex flex={1} justify="center" align="center">
              <Text align="center" color={appTheme.colors.warning}>
                {t('INSCRIPTION_CLOSED_TEXT')}
              </Text>
            </Flex>
          </Container>
        </SubnavbarStyle>
      )}
    </>
  );
}
