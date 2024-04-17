'use client';

// Libraries
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Divider, Container, Heading, Text, Flex, Button } from '@lawallet/ui';
import { useFormatter } from '@lawallet/react';
import type { AvailableLanguages } from '@lawallet/utils/types';

// Context
import { RoundsContext } from '../../../../context/RoundsContext';

// Theme
import { appTheme } from '../../../../config/exports';

// Hooks and utils
import { useMassacre } from '../../../../hooks/useMassacre';

// New ui-components
import Badge from '@/[locale]/components/Badge';
import { Card } from '@/[locale]/components/CardV2';
import { Icon } from '@/[locale]/components/Icon';
import { SackSats, Shield, Snowflake, ArrowLeft, ArrowRight } from '@/[locale]/components/Icons';
import { Tab, TabList, Tabs, TabPanel, TabPanels } from '@/[locale]/components/Tabs';

// Generic components
import { Navbar } from '../../components/Navbar';
import { GameTime } from '@/[locale]/components/GameTime';
import { RankingList } from '@/[locale]/components/RankingList';
import type { RoundEventContent, RoundStatus } from '../../../../types/round';

interface PageProps {
  params: {
    number: string;
  };
}

type MassacreRoundType = (RoundEventContent & { totalDistributedPower: number }) | null;

export default function Page({ params }: PageProps): JSX.Element {
  const t = useTranslations();
  const locale = useLocale() as AvailableLanguages;
  const { formatAmount } = useFormatter({ currency: 'SAT', locale });

  const round = parseInt(decodeURIComponent(params.number));

  // Context
  const { players } = useMassacre();
  const { currentRound, rounds, getMassacreByRoundIndex } = useContext(RoundsContext);
  const { currentBlock } = useMassacre();

  // Mocks
  const [nameTab, setNameTab] = useState<string>('alive');

  const [massacreRound, setMassacreRound] = useState<MassacreRoundType>(null);

  const roundStatus: RoundStatus = useMemo(() => {
    if (!currentRound) {
      return 'PENDING';
    }
    return currentRound.index === round ? 'ACTUAL' : currentBlock < rounds[round]!.height ? 'PENDING' : 'FINISHED';
  }, [currentRound, round, rounds, currentBlock]);

  const getMassacre = useCallback(async () => {
    const massacre = await getMassacreByRoundIndex(round);
    if (massacre)
      setMassacreRound({
        ...massacre,
        totalDistributedPower: (massacre.delta / 1000) * Object.keys(massacre.deadPlayers).length,
      });
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
              <Heading as="h3">
                {t('MASSACRE')} {round + 1}
              </Heading>
              {(rounds || rounds[round]) && (
                <Text color={appTheme.colors.gray50}>#{formatAmount(rounds[round]?.height || 0)}</Text>
              )}
            </Flex>
            <Badge color={roundStatus === 'FINISHED' ? 'success' : 'warning'}>
              {roundStatus === 'FINISHED' ? t('FINISHED') : roundStatus === 'ACTUAL' ? t('IN_PROGRESS') : t('PENDING')}
            </Badge>
          </Flex>
        </Container>
        <Divider y={16} />
        <Container size="small">
          <Flex justify="end" gap={4}>
            {round > 0 && (
              <Link href={`/massacre/${round - 1}`}>
                <Button size="small" variant="borderless" disabled={round === 0}>
                  <Icon size={4}>
                    <ArrowLeft />
                  </Icon>
                  {t('MASSACRE')} {round}
                </Button>
              </Link>
            )}
            {round <= rounds.length - 2 && (
              <Link href={`/massacre/${round + 1}`}>
                <Button size="small" variant="borderless" disabled={round === rounds.length - 1}>
                  {t('MASSACRE')} {round + 2}
                  <Icon size={4}>
                    <ArrowRight />
                  </Icon>
                </Button>
              </Link>
            )}
          </Flex>

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
                      {formatAmount(massacreRound?.totalDistributedPower || 0)}
                    </Heading>
                    <Text color={appTheme.colors.gray50}>{t('DISTRIBUTED_POWER')}.</Text>
                  </Flex>
                </Flex>
              </Card>
              <Divider y={16} />
              <Tabs>
                <TabList>
                  <Tab active={nameTab === 'alive'} onClick={() => handleChangeTab('alive')}>
                    {t('ALIVES')}
                  </Tab>
                  <Tab active={nameTab === 'massacre'} onClick={() => handleChangeTab('massacre')}>
                    {t('MASSACRED')}
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel show={nameTab === 'alive'}>
                    <RankingList
                      players={massacreRound?.players || {}}
                      type={'finished'}
                      newValue={massacreRound?.delta || 0}
                    />
                  </TabPanel>
                  <TabPanel show={nameTab === 'massacre'}>
                    <RankingList players={massacreRound?.deadPlayers || {}} type="massacre" />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </>
          ) : (
            <>
              {/* <Divider y={16} /> */}
              {currentBlock >= (rounds[round]?.freezeHeight || 0) && (
                <Flex direction="column" gap={8} align="center">
                  <Icon size={8}>
                    <Snowflake color={appTheme.colors.gray50} />
                  </Icon>

                  <Text size="small" color={appTheme.colors.gray50} align="center">
                    {t('POWER_LOCKED_DISTANCE')}
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