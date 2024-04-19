import { useState, useContext, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useFormatter } from '@lawallet/react';
import { Divider, Flex, Heading, Text } from '@lawallet/ui';
import type { AvailableLanguages } from '@lawallet/utils/types';

import { appTheme } from '../../../../../config/exports';

import { RoundsContext } from '../../../../../context/RoundsContext';

import { Card } from '@/[locale]/components/CardV2';
import { Icon } from '@/[locale]/components/Icon';
import { Medal, SackSats } from '@/[locale]/components/Icons';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@/[locale]/components/Tabs';

import { RankingList } from '@/[locale]/components/RankingList';

import type { PlayersPower } from '../../../../../types/power';
import { AutoAvatar } from '@/[locale]/components/AutoAvatar';
import { useMassacre } from '../../../../../hooks/useMassacre';

type FinishedContentProps = {
  players?: PlayersPower;
  deadPlayers?: PlayersPower;
  totalDistributedPower?: number;
  powerDistributedByPlayer?: number;
  round: number;
};

const FinishedContent = ({
  players,
  deadPlayers,
  totalDistributedPower,
  powerDistributedByPlayer,
  round,
}: FinishedContentProps) => {
  const t = useTranslations();
  const locale = useLocale() as AvailableLanguages;
  const { formatAmount } = useFormatter({ currency: 'SAT', locale });

  const { currentPool } = useMassacre();
  const { rounds } = useContext(RoundsContext);

  const [nameTab, setNameTab] = useState<string>('alive');

  const handleChangeTab = (value: string) => {
    setNameTab(value);
  };

  const finalists = useMemo(() => {
    if (!players || !deadPlayers) return;

    const survivorWalias = Object.keys(players!);
    const deadWalias = Object.keys(deadPlayers!);
    if (survivorWalias.length > 1) return;
    if (deadWalias.length > 1) return;

    let tmpFinalists: string[] = [survivorWalias[0]!, deadWalias[0]!];
    return tmpFinalists;
  }, [players, deadPlayers]);

  const distribution = useMemo(() => {
    const totalPrize = currentPool / 1000;

    return {
      first: formatAmount(totalPrize * 0.5),
      two: formatAmount(totalPrize * 0.25),
    };
  }, [currentPool]);

  if (rounds.length - 1 === round) {
    return (
      <>
        <Card spacing={4} variant="filled">
          <Flex direction="column" gap={16}>
            <Icon size={8}>
              <Medal color="#FAD240" />
            </Icon>
            <Flex gap={8} align="center">
              <AutoAvatar walias={finalists![0]!} size={8} />
              <Text>{finalists![0]!}</Text>
            </Flex>
            <Flex direction="column" align="center">
              <Heading>{distribution.first}</Heading>
              <Text size="small" color={appTheme.colors.gray50}>
                {t('PRIZE_OBTAINED_SATS')}.
              </Text>
            </Flex>
          </Flex>
        </Card>
        <Divider y={16} />
        <Card spacing={4}>
          <Flex direction="column" gap={16}>
            <Icon size={8}>
              <Medal color="#D6D6D6" />
            </Icon>
            <Flex gap={8} align="center">
              <AutoAvatar walias={finalists![1]!} size={8} />
              <Text>{finalists![1]!}</Text>
            </Flex>
            <Flex direction="column" align="center">
              <Heading as="h2">{distribution.two}</Heading>
              <Text size="small" color={appTheme.colors.gray50}>
                {t('PRIZE_OBTAINED_SATS')}.
              </Text>
            </Flex>
          </Flex>
        </Card>
      </>
    );
  }

  return (
    <>
      <Card variant="filled" spacing={4}>
        <Flex gap={16} align="center">
          <Icon size={8}>
            <SackSats color={appTheme.colors.success} />
          </Icon>
          <Flex direction="column">
            <Heading as="h4" color={appTheme.colors.success}>
              {formatAmount(totalDistributedPower || 0)}
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
            <RankingList players={players || {}} type={'finished'} newValue={powerDistributedByPlayer || 0} />
          </TabPanel>
          <TabPanel show={nameTab === 'massacre'}>
            <RankingList players={deadPlayers || {}} type="massacre" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default FinishedContent;
