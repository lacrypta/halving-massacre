'use client';

// Libraries
import { Divider, Container, Heading, Text, Flex } from '@lawallet/ui';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

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
import { useTranslations } from 'next-intl';
import type { RoundEventContent, RoundStatus } from '../../../../types/round';
import { RoundsContext } from '../../../../context/RoundsContext';

interface PageProps {
  params: {
    round: string;
  };
}

export default function Page({ params }: PageProps): JSX.Element {
  const t = useTranslations();

  const round = parseInt(decodeURIComponent(params.round));

  // Context
  const { players } = useMassacre();
  const { currentRound, rounds, getMassacreByRoundIndex } = useContext(RoundsContext);
  const { currentBlock } = useMassacre();

  // Mocks
  const [nameTab, setNameTab] = useState<string>('alive');

  const [massacreRound, setMassacreRound] = useState<RoundEventContent | null>(null);

  const roundStatus: RoundStatus = useMemo(() => {
    if (!currentRound) {
      return 'PENDING';
    }
    return currentRound.index === round ? 'ACTUAL' : currentBlock < rounds[round]!.height ? 'PENDING' : 'FINISHED';
  }, [currentRound, round, rounds, currentBlock]);

  const getMassacre = useCallback(async () => {
    const massacre = await getMassacreByRoundIndex(round);
    setMassacreRound(massacre);
  }, [round, roundStatus]);

  useEffect(() => {
    if (roundStatus === 'FINISHED') getMassacre();
  }, [round, roundStatus]);

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
              <Heading>Ronda {round + 1}</Heading>
              <Text color={appTheme.colors.gray50}>#{rounds[round]?.height}</Text>
            </Flex>
            <Badge color={roundStatus === 'FINISHED' ? 'success' : 'warning'}>
              {roundStatus === 'FINISHED' ? t('FINISHED') : roundStatus === 'ACTUAL' ? t('IN_PROGRESS') : 'Pendiente'}
            </Badge>
          </Flex>
        </Container>
        <Divider y={16} />
        <Container size="small">
          {roundStatus === 'FINISHED' ? (
            <>
              <Card variant="filled" spacing={4}>
                <Flex gap={16} align="center">
                  <Icon size={8}>
                    {roundStatus === 'FINISHED' ? (
                      <SackSats color={appTheme.colors.success} />
                    ) : (
                      <Shield color={appTheme.colors.warning} />
                    )}
                  </Icon>
                  <Flex direction="column">
                    <Heading
                      as="h4"
                      color={roundStatus === 'FINISHED' ? appTheme.colors.success : appTheme.colors.warning}
                    >
                      150.000
                    </Heading>
                    <Text color={appTheme.colors.gray50}>de poder distribuido.</Text>
                  </Flex>
                </Flex>
              </Card>
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
                    <RankingList players={massacreRound?.players || {}} type={'finished'} newValue={massacreRound?.delta || 0} />
                  </TabPanel>
                  <TabPanel show={nameTab === 'massacre'}>
                    <RankingList players={massacreRound?.deadPlayers || {}} type="massacre" />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </>
          ) : (
            <>
              <Divider y={16} />
              {currentBlock >= (rounds[round]?.freezeHeight || 0) && (
                <Flex direction="column" gap={8} align="center">
                  <Icon size={8}>
                    <Snowflake color={appTheme.colors.gray50} />
                  </Icon>

                  <Text size="small" color={appTheme.colors.gray50} align="center">
                    Poder freezado a 2 <br /> bloques de distancia.
                  </Text>
                </Flex>
              )}

              <Divider y={16} />
              <RankingList players={players || {}} type={'global'} />
            </>
          )}
        </Container>
      </Flex>
    </>
  );
}
