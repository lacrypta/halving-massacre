// React
import { useContext, useMemo } from 'react';

// Types
import type { RoundStatus } from '../../../../types/round';

// Libraries
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useFormatter } from '@lawallet/react';
import { Flex, Text } from '@lawallet/ui';

// Theme
import { appTheme } from '../../../../config/exports';

// New ui-components
import { Icon } from '../Icon';
import { Shield, ArrowRight, Sword, SackSats, Crown } from '../Icons';

// Style
import { RankingRoundsStyle, ItemStyle, IconStyle } from './style';
import { RoundsContext } from '../../../../context/RoundsContext';
import { useMassacre } from '../../../../hooks/useMassacre';
import { generateRoundsList } from '../../../../lib/utils';
import type { AvailableLanguages } from '@lawallet/utils/types';
import Gift from '../Icons/Gift';

export function RankingRounds() {
  const { rounds } = useContext(RoundsContext);
  const { currentBlock } = useMassacre();
  const locale = useLocale() as AvailableLanguages;
  const { formatAmount } = useFormatter({ currency: 'SAT', locale });

  // Generics
  const t = useTranslations();

  const renderIconByStatus = (value: RoundStatus, roundIndex: number) => {
    if (roundIndex === rounds.length - 1) return <Gift color={appTheme.colors.warning} />;
    if (roundIndex === rounds.length) return <Crown color={appTheme.colors.warning} />;

    switch (value) {
      case 'FINISHED':
        return <Shield color={appTheme.colors.error} />;
      case 'ACTUAL':
        return <Sword color={appTheme.colors.success} />;
      case 'PENDING':
        return <Shield color={appTheme.colors.warning} />;
    }
  };

  const renderMassacreTitle = (roundIndex: number) => {
    if (roundIndex === rounds.length - 1) return `${t('SEMIFINAL')}`;
    if (roundIndex === rounds.length) return `${t('FINAL')}`;

    return `${t('MASSACRE')} ${roundIndex}`;
  };

  const renderLinkByStatus = (value: RoundStatus) => {
    switch (value) {
      case 'FINISHED':
        return (
          <>
            <Text color={appTheme.colors.white}>{t('FINISHED')}</Text>
            <Icon size={4}>
              <ArrowRight color={appTheme.colors.white} />
            </Icon>
          </>
        );
      case 'ACTUAL':
        return (
          <>
            <Text color={appTheme.colors.success}>{t('IN_PROGRESS')}</Text>
            <Icon size={4}>
              <ArrowRight color={appTheme.colors.success} />
            </Icon>
          </>
        );
      case 'PENDING':
        return (
          <>
            <Text color={appTheme.colors.warning}>{t('SOON')}</Text>
            <Icon size={4}>
              <ArrowRight color={appTheme.colors.warning} />
            </Icon>
          </>
        );
      // return <Text color={appTheme.colors.gray50}>{t('SOON')}</Text>;
    }
  };

  const list = useMemo(() => generateRoundsList(rounds, currentBlock), [rounds, currentBlock]);

  return (
    <RankingRoundsStyle>
      {list.map((item, index) => {
        return (
          <ItemStyle key={index} $disabled={false}>
            <Link href={`/massacre/${item.round}`}>
              <Flex align="center" gap={16}>
                <Flex align="center" gap={8}>
                  <IconStyle>
                    <Icon size={4}>{renderIconByStatus(item.status, item.round + 1)}</Icon>
                  </IconStyle>
                  <Flex direction="column">
                    <Text>{renderMassacreTitle(item.round + 1)}</Text>
                    <Text size="small" color={appTheme.colors.gray50}>
                      #{formatAmount(item.block)}
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
