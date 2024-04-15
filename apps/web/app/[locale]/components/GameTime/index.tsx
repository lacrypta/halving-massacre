import Link from 'next/link';
import { Container, Flex, Text, Heading } from '@lawallet/ui';

import { GameTimeStyle } from './style';
import { appTheme } from '../../../../config/exports';
import { useContext, useMemo } from 'react';
import { RoundsContext } from '../../../../context/RoundsContext';
import { useMassacre } from '../../../../hooks/useMassacre';

export function GameTime() {
  const { currentBlock, status } = useMassacre();
  const { currentRound } = useContext(RoundsContext);
  const { round, block, time } = useMemo(() => {
    if (currentBlock === null || currentRound === null) {
      return {};
    }
    return {
      round: currentRound!.index,
      block: currentBlock,
      time: (currentRound!.height - currentBlock) * 10,
    };
  }, [currentRound, currentBlock]);

  if (['SETUP', 'CLOSED'].includes(status)) {
    return '';
  }

  return (
    <Link href={`/round/${round}`}>
      <GameTimeStyle $background={appTheme.colors.warning15}>
        <Container>
          <Flex flex={1} justify="space-between" align="center" gap={16}>
            <Flex direction="column">
              <Heading as="h4" color={appTheme.colors.warning}>
                Ronda {round} - {status === 'FREEZE' && 'Freezado'}
              </Heading>
              <Flex align="center" gap={4}>
                <Text size="small">#{block}</Text>
              </Flex>
            </Flex>
            {time && (
              <Flex direction="column" align="end">
                <Text>Próxima en:</Text>
                <Flex align="center" justify="end" gap={4}>
                  <Heading as="h4" color={appTheme.colors.warning}>
                    ~ {formatTime(time!)}
                  </Heading>
                </Flex>
              </Flex>
            )}
          </Flex>
        </Container>
      </GameTimeStyle>
    </Link>
  );
}

function formatTime(min: number): string {
  return min > 120 ? `${(min / 60).toFixed(0)} horas` : `${min} minutos`;
}
