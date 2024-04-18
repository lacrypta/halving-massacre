import { Icon } from '@/[locale]/components/Icon';
import { Snowflake } from '@/[locale]/components/Icons';
import { Divider, Flex, Text } from '@lawallet/ui';
import React from 'react';
import { appTheme } from '../../../../../config/exports';
import { RankingList } from '@/[locale]/components/RankingList';
import { useTranslations } from 'next-intl';
import type { PlayersPower } from '../../../../../types/power';

type ActualContentProps = {
  currentBlock: number;
  freezeHeight?: number;
  players?: PlayersPower;
};

const ActualContent = ({ currentBlock, freezeHeight, players }: ActualContentProps) => {
  const t = useTranslations();
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

      <Divider y={16} />
      <RankingList players={players || {}} type={'global'} />
    </>
  );
};

export default ActualContent;
