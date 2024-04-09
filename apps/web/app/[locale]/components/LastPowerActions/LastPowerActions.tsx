import { Container, Divider, Flex, Heading } from '@lawallet/ui';
import { useTranslations } from 'next-intl';
import { usePowerEvents } from '../../../../hooks/usePowerEvents';
import { ItemTxs } from '../ItemTxs';

const LastPowerActions = () => {
  const { powerActions } = usePowerEvents({ limit: 20 });

  const t = useTranslations();

  if (powerActions.length === 0) return;

  return (
    <Container size="small">
      <Divider y={24} />

      <Flex direction="column" gap={8}>
        <Heading as="h3">{t('LAST_10_ZAPS')}</Heading>
        <Divider y={8} />
        <Flex direction="column" gap={4}>
          {powerActions.splice(0, 10).map((action) => (
            // <Link href={`/profile/${action.player}`}>
            <ItemTxs
              key={action.id}
              walias={action.player}
              time={action.createdAt * 1000}
              message={action.message}
              value={action.amount}
              type="last-zap"
            />
            // </Link>
          ))}
        </Flex>
      </Flex>

      <Divider y={20} />
    </Container>
  );
};

export default LastPowerActions;
