// Libraries
import React, { useContext } from 'react';
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
import { Snowflake } from '@/[locale]/components/Icons';

// Generic components
import { RankingList } from '@/[locale]/components/RankingList';

import type { PlayersPower } from '../../../../../types/power';
import { Card } from '@/[locale]/components/CardV2';
import { CustomProgress } from './CustomProgress';
import { FinalUser } from './FinalUser';

type ActualContentProps = {
  currentBlock: number;
  freezeHeight?: number;
  players?: PlayersPower;
  round: number;
};

const ActualContent = ({ currentBlock, freezeHeight, players, round }: ActualContentProps) => {
  const t = useTranslations();
  const locale = useLocale() as AvailableLanguages;

  const { rounds } = useContext(RoundsContext);
  const { currentPool } = useMassacre();

  const { formatAmount } = useFormatter({ currency: 'SAT', locale });
  const totalPrice = formatAmount(currentPool / 1000);

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
          <CustomProgress valueOne={40} valueTwo={60} />
          <Divider y={16} />
          <Flex gap={16}>
            <FinalUser walias={'tesoro@lawallet.ar'} value={401300000} variant="primary" showQr={false} />
            <FinalUser walias={'pozo@lacrypta.ar'} value={601300000} variant="secondary" showQr={true} />
          </Flex>
        </>
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
