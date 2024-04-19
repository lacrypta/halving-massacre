// Libraries
import React, { useContext, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useFormatter } from '@lawallet/react';
import { Divider, Flex, Heading, Text } from '@lawallet/ui';
import type { AvailableLanguages } from '@lawallet/utils/types';

// Context
import { RoundsContext } from '../../../../../context/RoundsContext';

// Theme
import { appTheme } from '../../../../../config/exports';

// Hooks
import { useMassacre } from '../../../../../hooks/useMassacre';

// New ui-components
import { Icon } from '@/[locale]/components/Icon';
import { Loader, Snowflake } from '@/[locale]/components/Icons';

// Generic components
import { RankingList } from '@/[locale]/components/RankingList';

import type { PlayersPower } from '../../../../../types/power';
import { Card } from '@/[locale]/components/CardV2';
import { CustomProgress } from './CustomProgress';
import { FinalUser } from './FinalUser';
import { calculateFinalPercentages, estimateSurvivalChance, smoothLimits } from '../../../../../lib/utils';

type ActualContentProps = {
  currentBlock: number;
  freezeHeight?: number;
  players?: PlayersPower;
  round: number;
};

type FinalistInfo = {
  walias: string;
  totalPower: number;
  survivalChance: number;
};

type FinalData = {
  finalists: FinalistInfo[];
  percentages: { player1: string; player2: string } | undefined;
};

const ActualContent = ({ currentBlock, freezeHeight, players, round }: ActualContentProps) => {
  const t = useTranslations();
  const locale = useLocale() as AvailableLanguages;

  const { rounds } = useContext(RoundsContext);
  const { currentPool, buckets } = useMassacre();

  const { formatAmount } = useFormatter({ currency: 'SAT', locale });
  const totalPrice = formatAmount(currentPool / 1000);

  const finalInfo: FinalData | undefined = useMemo(() => {
    if (Object.keys(players!).length < 2 || rounds.length - 1 !== round) return;

    const finalists: FinalistInfo[] = [];
    for (let walias in players) {
      const totalPower = players[walias]!;

      finalists.push({
        walias,
        totalPower,
        survivalChance:
          (buckets.length > 0 && totalPower && smoothLimits(estimateSurvivalChance(buckets, totalPower) * 100)) || 0,
      });
    }

    return {
      finalists,
      percentages: calculateFinalPercentages(finalists[0]!.survivalChance, finalists[1]!.survivalChance),
    };
  }, [players, rounds, round]);

  return (
    <>
      {currentBlock >= (freezeHeight || 0) && (
        <Flex direction="column" gap={8} align="center">
          <Icon size={8}>
            <Snowflake color={appTheme.colors.gray50} />
          </Icon>

          <Text size="small" color={appTheme.colors.gray50} align="center">
            {t('POWER_LOCKED_DISTANCE')}
          </Text>
        </Flex>
      )}

      {rounds.length - 1 === round ? (
        !finalInfo ? (
          <Flex flex={1} justify="center">
            <Loader />
          </Flex>
        ) : (
          <>
            <Card spacing={4} variant="filled">
              <Flex direction="column">
                <Heading as="h2">{totalPrice}</Heading>
                <Text color={appTheme.colors.gray50}>{t('TOTAL_PRIZE')}.</Text>
              </Flex>
            </Card>
            <Divider y={16} />
            <Heading as="h3" align="center">
              {t('FINALISTS')}
            </Heading>
            <Divider y={12} />
            <CustomProgress
              valueOne={Number(finalInfo?.percentages?.player1)}
              valueTwo={Number(finalInfo?.percentages?.player2)}
            />
            <Divider y={16} />
            <Flex gap={16}>
              <FinalUser
                walias={finalInfo.finalists[0]?.walias!}
                value={finalInfo.finalists[0]?.totalPower!}
                variant="primary"
                showQr={false}
              />
              <FinalUser
                walias={finalInfo.finalists[1]?.walias!}
                value={finalInfo.finalists[1]?.totalPower!}
                variant="secondary"
                showQr={false}
              />
            </Flex>
          </>
        )
      ) : (
        <>
          <Divider y={16} />
          <RankingList players={players || {}} type={'global'} />
        </>
      )}
    </>
  );
};

export default ActualContent;
