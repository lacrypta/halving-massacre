'use client';

import { Container, Divider, Flex, Heading, Text } from '@lawallet/ui';

import { appTheme } from '@/../config/exports';
import { useTranslations } from 'next-intl';
import Card from './components/Card';
import Countdown from './components/Countdown';
import Header from './components/Header';
import { Navbar } from './components/Navbar';
import LocaleSwitcher from './components/LocaleSwitcher/LocaleSwitcher';
import { Navbar } from './components/Navbar';

// const PARTICIPANTES = ['fer@lawallet.ar', 'dios@lawallet.ar', 'agustin@lawallet.ar'];

export default function Page(): JSX.Element {
  const t = useTranslations();

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
              <Heading as="h2">1</Heading>
              <Text color={appTheme.colors.gray50}>{t('WINNER')}.</Text>
            </Card>
            <Card image="/emotes/rocket.png">
              <Heading as="h2">25.000</Heading>
              <Text color={appTheme.colors.gray50}>{t('PARTICIPANTS')}.</Text>
            </Card>
          </Flex>
          <Card image="/emotes/party.png" size="small">
            <Heading as="h2">2.100.000</Heading>
            <Text color={appTheme.colors.gray50}>{t('INITIAL_PRIZE_DESC')}.</Text>
          </Card>
        </Flex>

        <Divider y={20} />

        {/* <Heading align='center' as='h3'>
          Participantes
        </Heading>

        <Divider y={20} />

        {PARTICIPANTES.map((lud16: string) => (
          <React.Fragment key={lud16}>
            <Flex align='center' gap={8}>
              <Avatar>
                <AvatarImage src='/favicon.ico' alt='asd' />
              </Avatar>

              <Text>{lud16}</Text>
            </Flex>
            <Divider y={12} />
          </React.Fragment>
        ))} */}
      </Container>
    </>
  );
}
