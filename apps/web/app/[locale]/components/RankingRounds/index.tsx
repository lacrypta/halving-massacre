// Libraries
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Flex, Text, Divider } from '@lawallet/ui';

// Theme
import { appTheme } from '../../../../config/exports';

// New ui-components
import { Icon } from '../Icon';
import { Shield, ArrowRight, Sword, SackSats } from '../Icons';

// Style
import { RankingRoundsStyle, ItemStyle, IconStyle } from './style';

interface RankingRoundsProps {
  players: any;
}

// Mock
const list = [
  {
    round: 1,
    block: '819.000',
    status: 'FINISHED',
  },
  {
    round: 2,
    block: '819.200',
    status: 'ACTUAL',
  },
  {
    round: 3,
    block: '819.400',
    status: 'PENDING',
  },
  {
    round: 4,
    block: '819.600',
    status: 'PENDING',
  },
  {
    round: 5,
    block: '819.800',
    status: 'PENDING',
  },
  {
    round: 6,
    block: '820.000',
    status: 'PENDING',
  },
  {
    round: 7,
    block: '820.2000',
    status: 'PENDING',
  },
];

export function RankingRounds(props: RankingRoundsProps) {
  const { players } = props;

  // Generics
  const t = useTranslations();

  const renderIconByStatus = (value: string) => {
    switch (value) {
      case 'FINISHED':
        return <SackSats color={appTheme.colors.success} />;
      case 'ACTUAL':
        return <Sword color={appTheme.colors.warning} />;
      case 'PENDING':
        return <Shield color={appTheme.colors.gray50} />;
    }
  };

  const renderLinkByStatus = (value: string) => {
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
