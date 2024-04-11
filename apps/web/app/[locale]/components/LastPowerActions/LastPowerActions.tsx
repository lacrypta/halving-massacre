import { Container, Divider, Flex, Heading } from '@lawallet/ui';
import { useTranslations } from 'next-intl';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './style.module.css';
import './styles.css';

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
          <TransitionGroup className={styles.transactionElementsContainer}>
            {powerActions.splice(0, 10).map((action) => (
              <CSSTransition key={action.id} timeout={550} classNames="fade">
                <ItemTxs
                  walias={action.player}
                  time={action.createdAt * 1000}
                  message={action.message}
                  value={action.amount}
                  type="last-zap"
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Flex>
      </Flex>

      <Divider y={20} />
    </Container>
  );
};

export default LastPowerActions;
