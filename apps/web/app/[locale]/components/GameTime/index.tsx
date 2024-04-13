import Link from 'next/link';
import { Container, Flex, Text, Heading } from '@lawallet/ui';

import { GameTimeStyle } from './style';
import { appTheme } from '../../../../config/exports';

interface GameTimeProps {
  round: number;
  block: string;
  time: string;
}

export function GameTime(props: GameTimeProps) {
  const { round, block, time } = props;

  return (
    <Link href={`/round/${round}`}>
      <GameTimeStyle $background={appTheme.colors.warning15}>
        <Container>
          <Flex flex={1} justify="space-between" align="center" gap={16}>
            <Flex direction="column">
              <Heading as="h4" color={appTheme.colors.warning}>
                Ronda {round}
              </Heading>
              <Flex align="center" gap={4}>
                <Text size="small">#{block}</Text>
              </Flex>
            </Flex>
            <Flex direction="column" align="end">
              <Text>Próxima en:</Text>
              <Flex align="center" justify="end" gap={4}>
                <Heading as="h4" color={appTheme.colors.warning}>
                  ~ {time} minutos
                </Heading>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </GameTimeStyle>
    </Link>
  );
}
