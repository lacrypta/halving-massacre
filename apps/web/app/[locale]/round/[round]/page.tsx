'use client';

// Libraries
import { Divider, Container, Heading, Text, Flex } from '@lawallet/ui';
import { useState } from 'react';

// Theme
import { appTheme } from '../../../../config/exports';

// Hooks and utils
import { useMassacre } from '../../../../hooks/useMassacre';

// New ui-components
import Badge from '@/[locale]/components/Badge';
import { Card } from '@/[locale]/components/CardV2';
import { Icon } from '@/[locale]/components/Icon';
import { SackSats, Shield, Snowflake } from '@/[locale]/components/Icons';
import { Tab, TabList, Tabs, TabPanel, TabPanels } from '@/[locale]/components/Tabs';

// Generic components
import { Navbar } from '../../components/Navbar';
import { GameTime } from '@/[locale]/components/GameTime';
import { RankingList } from '@/[locale]/components/RankingList';

interface PageProps {
  params: {
    round: string;
  };
}

export default function Page({ params }: PageProps): JSX.Element {
  const round = decodeURIComponent(params.round);

  const itFinished = round === '1' ? true : false;

  // Context
  const { top100Players: players } = useMassacre();

  // Mocks
  const [nameTab, setNameTab] = useState<string>('alive');

  const handleChangeTab = (value: string) => {
    setNameTab(value);
  };

  return (
    <>
      <Navbar />
      <GameTime />
      <Divider y={16} />
      <Flex direction="column" align="center">
        <Container size="small">
          <Flex align="center">
            <Flex direction="column">
              <Heading>Ronda {round}</Heading>
              <Text color={appTheme.colors.gray50}>#819.200</Text>
            </Flex>
            <Badge color={itFinished ? 'success' : 'warning'}>{itFinished ? 'Finalizado' : 'En progreso'}</Badge>
          </Flex>
        </Container>
        <Divider y={16} />
        <Container size="small">
          <Card variant="filled" spacing={4}>
            <Flex gap={16} align="center">
              <Icon size={8}>
                {itFinished ? <SackSats color={appTheme.colors.success} /> : <Shield color={appTheme.colors.warning} />}
              </Icon>
              <Flex direction="column">
                <Heading as="h4" color={itFinished ? appTheme.colors.success : appTheme.colors.warning}>
                  150.000
                </Heading>
                <Text color={appTheme.colors.gray50}>de poder distribuido.</Text>
              </Flex>
            </Flex>
          </Card>
          {itFinished ? (
            <>
              <Divider y={16} />
              <Tabs>
                <TabList>
                  <Tab active={nameTab === 'alive'} onClick={() => handleChangeTab('alive')}>
                    Vivos
                  </Tab>
                  <Tab active={nameTab === 'massacre'} onClick={() => handleChangeTab('massacre')}>
                    Masacrados
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel show={nameTab === 'alive'}>
                    <RankingList players={players} type={'finished'} newValue={5000000} />
                  </TabPanel>
                  <TabPanel show={nameTab === 'massacre'}>
                    <RankingList players={players} type="massacre" />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </>
          ) : (
            <>
              <Divider y={16} />
              <Flex direction="column" gap={8} align="center">
                <Icon size={8}>
                  <Snowflake color={appTheme.colors.gray50} />
                </Icon>
                <Text size="small" color={appTheme.colors.gray50} align="center">
                  Poder freezado a 2 <br /> bloques de distancia.
                </Text>
              </Flex>
              <Divider y={16} />
              <RankingList players={players} type={'global'} />
            </>
          )}
        </Container>
      </Flex>
    </>
  );
}
