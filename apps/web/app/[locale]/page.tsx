'use client';

import { useTranslations } from 'next-intl';
import { Button, Container, Divider, Flex, Heading, Text } from '@lawallet/ui';

import { appTheme } from '@/../config/exports';

import { useMassacre } from '../../hooks/useMassacre';

import Card from './components/Card';
import Countdown from './components/Countdown';
import Header from './components/Header';
import { Navbar } from './components/Navbar';
import Link from 'next/link';

import ratsPng from '../../public/images/ratas.png';
import Image from 'next/image';

const EMERGENCY_LOCK = true;

export default function Page(): JSX.Element {
  const t = useTranslations();
  const { playerCount } = useMassacre();

  return EMERGENCY_LOCK ? (
    <>
      <Container>
        <Heading as="h3" align="center">
          <Divider y={32} />
          Fixing bugs. By right back.{' '}
          <Flex direction="column" justify="center" align="center" gap={8}>
            <Link href="https://discord.lacrypta.ar">
              <Button>La Crypta Discord</Button>
            </Link>

            <Image alt="" src={ratsPng} width={400} height={400} />
          </Flex>
        </Heading>
      </Container>
    </>
  ) : (
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
            <Heading as="h2">2.100.000</Heading>
            <Text color={appTheme.colors.gray50}>{t('INITIAL_PRIZE_DESC')}.</Text>
          </Card>
        </Flex>

        <Divider y={20} />
      </Container>
    </>
  );
}
