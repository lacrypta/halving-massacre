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
    <GameTimeStyle>
      <Container>
        <Flex flex={1} justify="space-between" align="center" gap={16}>
          <Flex direction="column">
            <Text>Ronda:</Text>
            <Flex align="center" gap={4}>
              <Heading as="h4" color={appTheme.colors.primary}>
                {round}
              </Heading>
              <Text size="small" color={appTheme.colors.gray50}>
                #{block}
              </Text>
            </Flex>
          </Flex>
          <Flex direction="column" align="end">
            <Text>Próxima en:</Text>
            <Flex align="center" justify="end" gap={4}>
              <Heading as="h4" color={appTheme.colors.secondary}>
                ~ {time} minutos
              </Heading>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </GameTimeStyle>
  );
}
