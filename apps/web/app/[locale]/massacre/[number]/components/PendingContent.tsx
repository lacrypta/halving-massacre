import { useContext } from 'react';
import { useTranslations } from 'next-intl';
import { Divider, Flex, Heading, Text } from '@lawallet/ui';

import { appTheme } from '../../../../../config/exports';

import { Card } from '@/[locale]/components/CardV2';
import { Icon } from '@/[locale]/components/Icon';
import { Medal } from '@/[locale]/components/Icons';

import { RoundsContext } from '../../../../../context/RoundsContext';

type PendingContentProps = {
  survivals?: number;
  round: number;
};

const PendingContent = ({ survivals, round }: PendingContentProps) => {
  const t = useTranslations();
  const { rounds } = useContext(RoundsContext);

  return (
    <>
      <Divider y={16} />

      <Card spacing={4} variant="filled">
        <Flex direction="column">
          <Heading as="h2">{survivals}</Heading>
          <Text size="small" color={appTheme.colors.gray50}>
            {t('SURVIVORS').toLowerCase()}.
          </Text>
        </Flex>
      </Card>

      <Divider y={16} />

      {round === rounds.length - 2 && (
        <>
          <Card spacing={4} variant="filled">
            <Flex direction="column">
              <Icon size={8}>
                <Medal color="#D1853C" />
              </Icon>
              <Divider y={4} />
              <Heading as="h3">6.25%</Heading>
              <Text size="small" color={appTheme.colors.gray50}>
                {t('FOR_THE_MASSACRED')}.
              </Text>
            </Flex>
          </Card>
          <Divider y={16} />
        </>
      )}

      {round === rounds.length - 1 && (
        <>
          <Flex gap={16}>
            <Card spacing={4} variant="filled">
              <Flex direction="column">
                <Icon size={8}>
                  <Medal color="#D6D6D6" />
                </Icon>
                <Divider y={4} />
                <Heading as="h3">25%</Heading>
                <Text size="small" color={appTheme.colors.gray50}>
                  {t('MASSACRED')}.
                </Text>
              </Flex>
            </Card>
            <Card spacing={4} variant="filled">
              <Flex direction="column">
                <Icon size={8}>
                  <Medal color="#FAD240" />
                </Icon>
                <Divider y={4} />
                <Heading as="h3">50%</Heading>
                <Text size="small" color={appTheme.colors.gray50}>
                  {t('SURVIVOR')}.
                </Text>
              </Flex>
            </Card>
          </Flex>
          <Divider y={16} />
        </>
      )}

      <Text size="small" color={appTheme.colors.gray50} align="center">
        {t('WAITING_PLAYERS_LIST')}
      </Text>

      {round === rounds.length - 3 && (
        <>
          <Text align="center">{t('ROUND_SURVIVORS_ASSURED_PRIZE')}</Text>
          <Divider y={16} />
        </>
      )}
    </>
  );
};

export default PendingContent;
