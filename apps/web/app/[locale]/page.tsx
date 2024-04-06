'use client';

import Image from 'next/image';
import { Container, Divider, Flex, Heading, Text } from '@lawallet/ui';

import { appTheme } from '@/../config/exports';
import { useTranslations } from 'next-intl';
import Card from './components/Card';
import Countdown from './components/Countdown';
import Header from './components/Header';
import { Navbar } from './components/Navbar';
import { useMassacre } from '../../hooks/useMassacre';

export default function Page(): JSX.Element {
  const t = useTranslations();
  const { playerCount } = useMassacre();

  return (
    <>
      <Navbar />
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
            <Heading as="h2">2.100.000</Heading>
            <Text color={appTheme.colors.gray50}>{t('INITIAL_PRIZE_DESC')}.</Text>
          </Card>
        </Flex>

        <Divider y={20} />
      </Container>
    </>
  );
}
