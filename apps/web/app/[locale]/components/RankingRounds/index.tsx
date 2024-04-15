// React
import { useContext, useMemo } from 'react';

// Libraries
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Flex, Text } from '@lawallet/ui';

// Theme
import { appTheme } from '../../../../config/exports';

// New ui-components
import { Icon } from '../Icon';
import { Shield, ArrowRight, Sword, SackSats } from '../Icons';

// Style
import { RankingRoundsStyle, ItemStyle, IconStyle } from './style';
import { RoundsContext, getCurrentRound } from '../../../../context/RoundsContext';
import type { MassacreRound } from '../../../../types/massacre';
import { useMassacre } from '../../../../hooks/useMassacre';

interface Round {
  round: number;
  block: number;
  status: RoundStatus;
}

type RoundStatus = 'FINISHED' | 'ACTUAL' | 'PENDING';

export function RankingRounds() {
  const { rounds } = useContext(RoundsContext);
  const { currentBlock } = useMassacre();

  // Generics
  const t = useTranslations();

  const renderIconByStatus = (value: RoundStatus) => {
    switch (value) {
      case 'FINISHED':
        return <SackSats color={appTheme.colors.success} />;
      case 'ACTUAL':
        return <Sword color={appTheme.colors.warning} />;
      case 'PENDING':
        return <Shield color={appTheme.colors.gray50} />;
    }
  };

  const renderLinkByStatus = (value: RoundStatus) => {
    switch (value) {
      case 'FINISHED':
        return (
          <>
            <Text>{t('FINISHED')}</Text>
            <Icon size={4}>
              <ArrowRight />
            </Icon>
          </>
        );
      case 'ACTUAL':
        return (
          <>
            <Text color={appTheme.colors.warning}>{t('IN_PROGRESS')}</Text>
            <Icon size={4}>
              <ArrowRight color={appTheme.colors.warning} />
            </Icon>
          </>
        );
      case 'PENDING':
        return <Text color={appTheme.colors.gray50}>{t('SOON')}</Text>;
    }
  };

  const list = useMemo(() => generateRoundsList(rounds, currentBlock), [rounds, currentBlock]);

  return (
    <RankingRoundsStyle>
      {list.map((item, index) => {
        return (
          <ItemStyle key={index} $disabled={item.status === 'PENDING'}>
            <Link href={`/round/${item.round}`}>
              <Flex align="center" gap={16}>
                <Flex align="center" gap={8}>
                  <IconStyle>
                    <Icon size={4}>{renderIconByStatus(item.status)}</Icon>
                  </IconStyle>
                  <Flex direction="column">
                    <Text>Ronda {item.round}</Text>
                    <Text size="small" color={appTheme.colors.gray50}>
                      #{item.block}
                    </Text>
                  </Flex>
                </Flex>
                <Flex align="center" justify="end">
                  {renderLinkByStatus(item.status)}
                </Flex>
              </Flex>
            </Link>
          </ItemStyle>
        );
      })}
    </RankingRoundsStyle>
  );
}

function generateRoundsList(rounds: MassacreRound[], currentBlock: number): Round[] {
  const currentRound = getCurrentRound(rounds, currentBlock);

  return rounds.map((round, k) => {
    const finished = currentBlock >= round.height;
    return {
      round: k + 1,
      block: round.height,
      status: k === currentRound?.index ? 'ACTUAL' : finished ? 'FINISHED' : 'PENDING',
    };
  });
}
