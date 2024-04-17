'use client';
import { Button, Container, Divider, Flex, Heading, Text } from '@lawallet/ui';
import { useContext, useEffect, useState } from 'react';
import { MassacreContext } from '../../../context/MassacreContext';
import type { PlayersPower } from '../../../types/power';
import { halve } from '../../../utils/lottery';
import { Navbar } from '../components/Navbar';
import { RankingList } from '../components/RankingList';
import Badge from '../components/Badge';
import { appTheme } from '../../../config/exports';
import { SackSats } from '../components/Icons';
import { formatAmount } from '../../../lib/utils';
import { Icon } from '../components/Icon';
import { Card } from '../components/CardV2';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '../components/Tabs';
import { useTranslations } from 'next-intl';

type ISimulationRound = {
  blockHeader: string;
  survivors: PlayersPower;
  deaths: PlayersPower;
  distributedPower: number;
  totalDistributedPower: number;
};

type ISimulation = {
  roundIndex: number;
  nextRound: number;
  players: PlayersPower;
  rounds: ISimulationRound[];
};

function generateHeader() {
  const length = 45;

  return '0'.repeat(19) + Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}
const page = () => {
  const [nameTab, setNameTab] = useState<string>('alive');
  const { players } = useContext(MassacreContext);
  const [simulationInfo, setSimulationInfo] = useState<ISimulation>({
    roundIndex: -1,
    nextRound: 0,
    players: {},
  } as ISimulation);

  const t = useTranslations('simulator');
  const initSimulate = () => {
    if (simulationInfo.nextRound === -1) return;

    const halvePlayers =
      simulationInfo.roundIndex === -1
        ? simulationInfo.players
        : simulationInfo.rounds[simulationInfo.roundIndex]!.survivors;

    const blockHeader: string = generateHeader();
    const halveResult = halve(blockHeader, halvePlayers);

    const sortedLosers = halveResult.losers.sort((a, b) => simulationInfo.players![b]! - simulationInfo.players![a]!);
    const losersPower: PlayersPower = sortedLosers.reduce((obj: PlayersPower, name: string) => {
      if (simulationInfo.players!.hasOwnProperty(name)) {
        obj[name] = simulationInfo.players?.[name] ?? 0;
      }
      return obj;
    }, {});

    const winnersArray = Object.entries(halveResult.winners!);
    winnersArray.sort((a, b) => players![b[0]]! - players![a[0]]!);
    const winnersSortedByAmount = Object.fromEntries(winnersArray);

    const distributedPower = Number((halveResult.delta / Object.keys(halveResult.winners).length).toFixed(0));
    const updatedPlayers: PlayersPower = {};
    for (const name in halveResult.winners) {
      if (simulationInfo.players.hasOwnProperty(name)) {
        updatedPlayers[name] = halveResult.winners![name]! + distributedPower;
      }
    }

    setSimulationInfo((prev) => {
      return {
        ...prev,
        players: { ...prev.players, ...updatedPlayers },
        roundIndex: prev.nextRound,
        nextRound: Object.keys(halveResult.winners).length === 1 ? -1 : prev.nextRound + 1,
        rounds: [
          ...prev.rounds,
          {
            blockHeader,
            survivors: winnersSortedByAmount,
            deaths: losersPower,
            distributedPower,
            totalDistributedPower: halveResult.delta,
          },
        ],
      };
    });
  };

  useEffect(() => {
    if (players)
      setSimulationInfo((prev) => {
        return { ...prev, players, rounds: [] };
      });
  }, [players]);

  return (
    <Container>
      <Navbar />
      <Divider y={16} />

      <Flex direction="column" align="center">
        <Heading as="h1">{t('TITLE')}</Heading>

        <Divider y={16} />

        <Text>
          {t('PARTICIPANTS')}: {Object.keys(players ?? {}).length}
        </Text>

        <Divider y={16} />

        {simulationInfo.nextRound !== -1 ? (
          <Button onClick={initSimulate} disabled={Object.keys(simulationInfo.players).length === 0}>
            {simulationInfo.nextRound === 0 ? t('INIT_SIMULATE') : t('NEXT_ROUND')}
          </Button>
        ) : (
          <Button onClick={() => window.location.reload()} disabled={Object.keys(simulationInfo.players).length === 0}>
            Reset
          </Button>
        )}
      </Flex>

      <Divider y={20} />

      <Container size="small">
        {simulationInfo.nextRound === 0 ? (
          <RankingList players={simulationInfo.players || {}} type={'global'} />
        ) : simulationInfo.roundIndex !== -1 ? (
          <>
            <Flex align="center" direction="column">
              <Text>{t('HASH')}:</Text>
              <Divider y={16} />
              <Text>{simulationInfo.rounds[simulationInfo.roundIndex]?.blockHeader ?? ''}</Text>
              <Divider y={16} />
            </Flex>

            <Flex direction="column" align="center">
              <Container size="small">
                <Flex align="center">
                  <Flex direction="column">
                    <Heading as={'h2'}>
                      {t('MASSACRED')} {simulationInfo.roundIndex + 1}
                    </Heading>
                  </Flex>
                  <Badge color={'success'}>{t('FINISH')}</Badge>
                </Flex>
              </Container>
            </Flex>

            <>
              <Card variant="filled" spacing={4}>
                <Flex gap={16} align="center">
                  <Icon size={8}>
                    <SackSats color={appTheme.colors.success} />
                  </Icon>
                  <Flex direction="column">
                    <Heading as="h4" color={appTheme.colors.success}>
                      {formatAmount(simulationInfo.rounds[simulationInfo.roundIndex]?.totalDistributedPower || 0)}
                    </Heading>
                    <Text color={appTheme.colors.gray50}>{t('DISTRIBUTED_POWER')}.</Text>
                  </Flex>
                </Flex>
              </Card>
              <Divider y={16} />
              <Tabs>
                <TabList>
                  <Tab active={nameTab === 'alive'} onClick={() => setNameTab('alive')}>
                    {t('ALIVES')}
                  </Tab>
                  <Tab active={nameTab === 'massacre'} onClick={() => setNameTab('massacre')}>
                    {t('MASSACRED')}
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel show={nameTab === 'alive'}>
                    <RankingList
                      players={simulationInfo.rounds[simulationInfo.roundIndex]?.survivors || {}}
                      type={'finished'}
                      newValue={simulationInfo.rounds[simulationInfo.roundIndex]?.distributedPower || 0}
                    />
                  </TabPanel>
                  <TabPanel show={nameTab === 'massacre'}>
                    <RankingList
                      players={simulationInfo.rounds[simulationInfo.roundIndex]?.deaths || {}}
                      type="massacre"
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </>
          </>
        ) : null}
      </Container>
    </Container>
  );
};

export default page;
