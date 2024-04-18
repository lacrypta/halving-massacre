'use client';

// Libraries
import { useFormatter } from '@lawallet/react';
import { Container, Divider, Flex, Heading, Text } from '@lawallet/ui';
import type { AvailableLanguages } from '@lawallet/utils/types';
import { useLocale, useTranslations } from 'next-intl';
import { useContext, useState } from 'react';

// Theme
import { appTheme } from '../../../config/exports';

// Hooks and utils
import { RoundsContext } from '../../../context/RoundsContext';
import { useMassacre } from '../../../hooks/useMassacre';

// New ui-components
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '../components/Tabs';

// Generic components
import Card from '../components/Card';
import { GameTime } from '../components/GameTime';
import { Navbar } from '../components/Navbar';
import { RankingListWithDead } from '../components/RankingList/RankingListWithDead';
import { RankingRounds } from '../components/RankingRounds';
import Treasury from '../components/TreasuryAnimation';

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

  const { rounds } = useContext(RoundsContext);
  const { players, currentPool } = useMassacre();
  const { formatAmount } = useFormatter({ currency: 'SAT', locale });
  const totalPrice = formatAmount(currentPool / 1000);

  // Mocks
  const [nameTab, setNameTab] = useState<string>('massacres');

  const handleChangeTab = (value: string) => {
    setNameTab(value);
  };

  return (
    <>
      <Navbar />
      <GameTime />
      <Divider y={16} />
      <Flex direction="column" align="center">
        <Heading as="h1">{t('MASSACRES')}</Heading>
        <Divider y={16} />
        <Container>
          <Card animation={<Treasury />} size="small">
            <Heading as="h2">{totalPrice}</Heading>
            <Text color={appTheme.colors.gray50}>{t('TOTAL_PRIZE')}.</Text>
          </Card>
        </Container>

        <Divider y={16} />
        <Container size="small">
          <Tabs>
            <TabList>
              <Tab
                disabled={rounds.length < 1}
                active={nameTab === 'massacres'}
                onClick={() => handleChangeTab('massacres')}
              >
                {t('MASSACRES')}
              </Tab>
              <Tab active={nameTab === 'global'} onClick={() => handleChangeTab('global')}>
                Top 100
              </Tab>
            </TabList>
          </Tabs>
          <TabPanels>
            <TabPanel show={nameTab === 'massacres'}>
              <Divider y={16} />
              <RankingRounds />
            </TabPanel>
            <TabPanel show={nameTab === 'global'}>
              <Divider y={16} />
              <RankingListWithDead players={[]} />
            </TabPanel>
          </TabPanels>
        </Container>
      </Flex>
    </>
  );
}
