// React
import { useContext, useMemo } from 'react';

// Types
import type { RoundStatus } from '../../../../types/round';

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
import { RoundsContext } from '../../../../context/RoundsContext';
import { useMassacre } from '../../../../hooks/useMassacre';
import { generateRoundsList } from '../../../../lib/utils';

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
                    <Text>
                      {t('ROUND')} {item.round + 1}
                    </Text>
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
