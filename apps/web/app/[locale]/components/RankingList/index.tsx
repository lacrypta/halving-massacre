import Link from 'next/link';
import { Flex, Text } from '@lawallet/ui';

import { appTheme } from '../../../../config/exports';

import { AutoAvatar } from '../AutoAvatar';
import { Icon } from '../Icon';
import { Bolt, Shield, Skull } from '../Icons';

import { RankingListStyle, ItemStyle, NumberStyle, WaliasStyle, ValueStyle } from './style';
import { formatAmount } from '../../../../lib/utils';

interface RankingListProps {
  players: any;
  type?: 'global' | 'massacre' | 'in-game' | 'finished';
  newValue?: number;
}

export function RankingList(props: RankingListProps) {
  const { players, type = 'global', newValue = 0 } = props;

  const renderValueByType = (value: string, walias: string) => {
    switch (value) {
      case 'global':
        return (
          <>
            <ValueStyle>
              <Text color={appTheme.colors.success}>{formatAmount(players[walias]!) || '21'}</Text>
            </ValueStyle>
            <Icon size={4}>
              <Shield color={appTheme.colors.success} />
            </Icon>
          </>
        );
        break;
      case 'massacre':
        return (
          <>
            <ValueStyle>
              <Text color={appTheme.colors.gray50}>{formatAmount(players[walias]!) || '21'}</Text>
            </ValueStyle>
            <Icon size={4}>
              <Skull color={appTheme.colors.gray50} />
            </Icon>
          </>
        );
        break;
      case 'finished':
        return (
          <>
            <ValueStyle>
              <Text color={appTheme.colors.success}>+{formatAmount(newValue)}</Text>
            </ValueStyle>
            <Icon size={4}>
              <Shield color={appTheme.colors.success} />
            </Icon>
          </>
        );
        break;
    }
  };

  return (
    <RankingListStyle>
      <Flex align="center" gap={4} direction="column" justify="center">
        {Object.keys(players).map((walias, index) => {
          return (
            <ItemStyle key={walias}>
              <Link href={`/profile/${walias}`} title={walias}>
                <Flex flex={1} align="center" gap={8} justify="space-between">
                  <Flex align="center" gap={4}>
                    <NumberStyle>
                      <Text size="small" color={appTheme.colors.gray50}>
                        {index + 1}.
                      </Text>
                    </NumberStyle>
                    <Flex align="center" gap={8} flex={0}>
                      <AutoAvatar walias={walias} size={12} />
                      <WaliasStyle>
                        <Text>{walias}</Text>
                      </WaliasStyle>
                    </Flex>
                  </Flex>
                  <Flex align="center" flex={0} gap={4}>
                    {renderValueByType(type, walias)}
                  </Flex>
                </Flex>
              </Link>
            </ItemStyle>
          );
        })}
      </Flex>
    </RankingListStyle>
  );
}
