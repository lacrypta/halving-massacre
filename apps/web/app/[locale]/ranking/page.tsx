'use client';

// Libraries
import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Container, Divider, Flex, Heading, Text } from '@lawallet/ui';
import { useFormatter } from '@lawallet/react';
import type { AvailableLanguages } from '@lawallet/utils/types';

// Theme
import { appTheme } from '../../../config/exports';

// Hooks and utils
import { useMassacre } from '../../../hooks/useMassacre';

// Generic components
import { Navbar } from '../components/Navbar';
import Card from '../components/Card';
import Treasury from '../components/TreasuryAnimation';

import { RankingList } from '../components/RankingList';
import { Tab, TabList, Tabs, TabPanel, TabPanels } from '../components/Tabs';
import { GameTime } from '../components/GameTime';

interface PageProps {
  params: {
    lud16: string;
  };
}

export default function Page({ params }: PageProps): JSX.Element {
  // Generics
  const t = useTranslations();
  const locale = useLocale() as AvailableLanguages;

  // Context
  const { top100Players: players, currentPool } = useMassacre();
  const { formatAmount } = useFormatter({ currency: 'SAT', locale });
  const totalPrice = formatAmount(currentPool / 1000);

  // Mocks
  const [nameTab, setNameTab] = useState('global');

  return (
    <>
      <Navbar />
      {/* <GameTime round={10} block="820.000" time="20" /> */}
      <Divider y={16} />
      <Flex direction="column" align="center">
        <Heading as="h1">Ranking</Heading>
        <Divider y={16} />
        <Container>
          <Card animation={<Treasury />} size="small">
            <Heading as="h2">{totalPrice}</Heading>
            <Text color={appTheme.colors.gray50}>{t('TOTAL_PRIZE')}.</Text>
          </Card>
        </Container>
        <Divider y={16} />
        <Heading align="center" as="h3">
          Top 100
        </Heading>

        <Divider y={16} />
        <Container size="small">
          <Tabs>
            <TabList>
              <Tab active={nameTab === 'global' && true} onClick={() => setNameTab('global')}>
                Global
              </Tab>
              <Tab active={nameTab === 'massacre' && true} onClick={() => setNameTab('massacre')} disabled={true}>
                Masacrados
              </Tab>
            </TabList>
          </Tabs>
          <TabPanels>
            <TabPanel show={nameTab === 'global' && true}>
              <Divider y={16} />
              <RankingList players={players} />
            </TabPanel>
            <TabPanel show={nameTab === 'massacre' && true}>
              <Divider y={16} />
              {/* Agregar listado de jugadores massacrados */}
              {/* <RankingList players={players} type="massacre" /> */}
            </TabPanel>
          </TabPanels>
        </Container>
      </Flex>
    </>
  );
}
