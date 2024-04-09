'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Container, Divider, Flex, Heading, Text } from '@lawallet/ui';
import { formatToPreference } from '@lawallet/utils';
import type { AvailableLanguages } from '@lawallet/utils/types';

import { appTheme } from '@/../config/exports';

import { useMassacre } from '../../hooks/useMassacre';

import Card from './components/Card';
import Countdown from './components/Countdown';
import Header from './components/Header';
import { Navbar } from './components/Navbar';
import { ItemTxs } from './components/ItemTxs';

export default function Page(): JSX.Element {
  const t = useTranslations();
  const { playerCount, currentPool } = useMassacre();
  const locale = useLocale();
  const totalPrice = formatToPreference('SAT', currentPool / 1000, locale as AvailableLanguages, false);

  return (
    <>
      <Navbar />
      {/* <GameTime round={10} block="820.000" time="20" /> */}
      <Divider y={16} />
      <Container>
        <Flex direction="column" align="center">
          <Header />
          <Divider y={24} />
          <Countdown />
        </Flex>

        <Divider y={24} />

        <Flex direction="column" gap={8}>
          <Flex direction="row" gap={8}>
            <Card image="/emotes/crown.png">
              <Heading as="h2">4-7</Heading>
              <Text color={appTheme.colors.gray50}>{t('WINNERS')}.</Text>
            </Card>
            <Card image="/emotes/rocket.png">
              <Heading as="h2">{playerCount || 0}</Heading>
              <Text color={appTheme.colors.gray50}>{t('PARTICIPANTS')}.</Text>
            </Card>
          </Flex>
          <Card image="/emotes/party.png" size="small">
            <Heading as="h2">{totalPrice}</Heading>
            <Text color={appTheme.colors.gray50}>{t('TOTAL_PRIZE')}.</Text>
          </Card>
        </Flex>
      </Container>
      {/* <Container size="small">
        <Divider y={24} />

        <Flex direction="column" gap={8}>
          <Heading as="h3">{'Últimos 10 zappeos'}</Heading>
          <Divider y={8} />
          <Flex direction="column" gap={4}>
            <ItemTxs walias="fer@lawallet.ar" time="" message="asdasd" value={100000} type="last-zap" />
            <ItemTxs walias="agustin@lacrypta.ar" time="" message="" value={100000} type="last-zap" />
          </Flex>
        </Flex>

        <Divider y={20} />
      </Container> */}
    </>
  );
}
