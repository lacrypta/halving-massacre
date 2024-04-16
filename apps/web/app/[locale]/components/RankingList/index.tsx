import Link from 'next/link';
import { Flex, Text } from '@lawallet/ui';

import { appTheme } from '../../../../config/exports';

import { AutoAvatar } from '../AutoAvatar';
import { Icon } from '../Icon';
import { Bolt, Shield } from '../Icons';

import { RankingListStyle, ItemStyle, NumberStyle, WaliasStyle, ValueStyle } from './style';
import { formatAmount } from '../../../../lib/utils';
import type { PlayersPower } from '../../../../types/power';

interface RankingListProps {
  players: PlayersPower;
  type?: 'global' | 'massacre';
}

export function RankingList(props: RankingListProps) {
  const { players, type = 'global' } = props;

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
                    <ValueStyle>
                      <Text color={type === 'global' ? appTheme.colors.success : appTheme.colors.error}>
                        {formatAmount(players[walias]!) || '21'}
                      </Text>
                    </ValueStyle>
                    <Icon size={4}>
                      <Shield color={type === 'global' ? appTheme.colors.success : appTheme.colors.error} />
                    </Icon>
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
