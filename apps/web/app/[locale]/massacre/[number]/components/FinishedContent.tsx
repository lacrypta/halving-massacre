import { Card } from '@/[locale]/components/CardV2';
import { Icon } from '@/[locale]/components/Icon';
import { SackSats } from '@/[locale]/components/Icons';
import { RankingList } from '@/[locale]/components/RankingList';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@/[locale]/components/Tabs';
import { useFormatter } from '@lawallet/react';
import { Divider, Flex, Heading, Text } from '@lawallet/ui';
import type { AvailableLanguages } from '@lawallet/utils/types';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { appTheme } from '../../../../../config/exports';
import type { PlayersPower } from '../../../../../types/power';

type FinishedContentProps = {
  players?: PlayersPower;
  deadPlayers?: PlayersPower;
  totalDistributedPower?: number;
  powerDistributedByPlayer?: number;
};

const FinishedContent = ({
  players,
  deadPlayers,
  totalDistributedPower,
  powerDistributedByPlayer,
}: FinishedContentProps) => {
  const t = useTranslations();
  const locale = useLocale() as AvailableLanguages;
  const { formatAmount } = useFormatter({ currency: 'SAT', locale });
  const [nameTab, setNameTab] = useState<string>('alive');

  const handleChangeTab = (value: string) => {
    setNameTab(value);
  };

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
