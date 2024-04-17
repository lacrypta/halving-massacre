// Libraries
import Link from 'next/link';
import { Flex, Text } from '@lawallet/ui';

// Theme
import { appTheme } from '../../../../config/exports';

// Hooks and utils
import { useMassacre } from '../../../../hooks/useMassacre';
import { formatAmount } from '../../../../lib/utils';
import type { PlayersPowerWithDead } from '../../../../types/power';

import { AutoAvatar } from '../AutoAvatar';
import { Icon } from '../Icon';
import { Shield, Skull } from '../Icons';

import { RankingListStyle, ItemStyle, NumberStyle, WaliasStyle, ValueStyle } from './style';

interface RankingListProps {
  // Remove mock
  players: [] | PlayersPowerWithDead;
}

export function RankingListWithDead(props: RankingListProps) {
  // const {} = props;

  // Remove mock
  const { top100WithDead: players } = useMassacre();

  const renderByAlive = (walias: string) => {
    switch (players[walias]!.isAlive) {
      case true:
        return (
          <>
            <ValueStyle>
              <Text color={appTheme.colors.success}>{formatAmount(players[walias]!.power) || '21'}</Text>
            </ValueStyle>
            <Icon size={4}>
              <Shield color={appTheme.colors.success} />
            </Icon>
          </>
        );
        break;
      case false:
        return (
          <>
            <ValueStyle>
              <Text color={appTheme.colors.gray50}>{formatAmount(players[walias]!.power) || '21'}</Text>
            </ValueStyle>
            <Icon size={4}>
              <Skull color={appTheme.colors.gray50} />
            </Icon>
          </>
        );
        break;
    }
  };

  return (
    <RankingListStyle>
      <Flex align="center" gap={4} direction="column" justify="center">
        {Object.keys(players).map((player, index) => {
          return (
            <ItemStyle key={index}>
              <Link href={`/profile/${player}`} title={player}>
                <Flex flex={1} align="center" gap={8} justify="space-between">
                  <Flex align="center" gap={4}>
                    <NumberStyle>
                      <Text size="small" color={appTheme.colors.gray50}>
                        {index + 1}.
                      </Text>
                    </NumberStyle>
                    <Flex align="center" gap={8} flex={0}>
                      <AutoAvatar walias={player} size={12} />
                      <WaliasStyle>
                        <Text>{player}</Text>
                      </WaliasStyle>
                    </Flex>
                  </Flex>
                  <Flex align="center" flex={0} gap={4}>
                    {renderByAlive(player)}
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
