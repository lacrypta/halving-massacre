import { useEffect, useMemo, useState } from 'react';

// @lawallet/ui
import { Button, Container, Divider, Flex, Heading, Text } from '@lawallet/ui';

// New ui-components
import Badge from '../Badge/index';
// import Progress from '../Progress';
import { Avatar } from '../Avatar';
import { Card } from '../CardV2';
import { Icon } from '../Icon';
import { Bolt, Loader, Shield, Skull, Ticket } from '../Icons';

import styles from '../LastPowerActions/style.module.css';
import '../LastPowerActions/styles.css';

const NEXT_PUBLIC_TARGET_COUNTDOWN = process.env.NEXT_PUBLIC_TARGET_COUNTDOWN! || '2024-04-13T12:00:00';
const targetDate: Date = new Date(NEXT_PUBLIC_TARGET_COUNTDOWN);

import { appTheme } from '@/../config/exports';

// Hooks
import { usePlayer } from '@/../hooks/usePlayer';
import { useFormatter, useProfile } from '@lawallet/react';
import type { AvailableLanguages } from '@lawallet/utils/types';
import { useLocale, useTranslations } from 'next-intl';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useMassacre } from '../../../../hooks/useMassacre';
import { usePowerEvents } from '../../../../hooks/usePowerEvents';
import { estimateSurvivalChance, smoothLimits } from '../../../../lib/utils';
import type { MassacreStatus } from '../../../../types/massacre';
import CountdownBox from '../CountdownBox';
import { ItemTxs } from '../ItemTxs';
import Progress from '../Progress';

export interface PlayerDashboardInterface {
  walias: string;
  onAddPower: Function;
  onBuyTicket: Function;
}

const EMERGENCY_LOCK_TICKET = process.env.EMERGENCY_LOCK_TICKET === 'true';
const EMERGENCY_LOCK_POWER = process.env.EMERGENCY_LOCK_POWER === 'true';

const closedPowerStatuses: MassacreStatus[] = ['FREEZE', 'FINAL'];

const powerActionVariants = {
  LIGHTNING: <Bolt color={appTheme.colors.primary} />,
  MASSACRE: <Shield color={appTheme.colors.success} />,
  // ONCHAIN: <Bitcoin color={appTheme.colors.warning15} />,
};

export function PlayerDashboard({ walias, onBuyTicket, onAddPower }: PlayerDashboardInterface) {
  const { nip05, lud16, nip05Avatar, lud16Avatar, domainAvatar } = useProfile({ walias });
  const { hasTicket } = usePlayer(); // TODO: return totalPower
  const { powerActions } = usePowerEvents({ walias });
  const [totalPower, setTotalPower] = useState(0); // TODO: should be get from usePlayer
  const { status, buckets, players } = useMassacre();

  const t = useTranslations();
  const locale = useLocale() as AvailableLanguages;

  const isAlive = useMemo(() => {
    return players ? Object.hasOwn(players, walias) : true;
  }, [players, walias]);

  const rankingPosition = useMemo(() => {
    return players ? Object.keys(players).indexOf(walias) + 1 : 0;
  }, [players, walias]);

  const { formatAmount } = useFormatter({ currency: 'SAT', locale });

  const powerProgress = useMemo(() => {
    return (buckets.length > 0 && totalPower && smoothLimits(estimateSurvivalChance(buckets, totalPower) * 100)) || 0;
  }, [buckets, totalPower]);

  // Mock data
  const positionNumber = 554;

  useEffect(() => {
    setTotalPower(powerActions.reduce((a, b) => a + b.amount, 0));
  }, [powerActions]);

  if (!lud16 && !nip05?.lud16 && !nip05?.lud06)
    return (
      <Flex direction="column" flex={1} align="center" justify="center" gap={8}>
        <Icon size={8}>
          <Loader />
        </Icon>
        <Text size="small" color={appTheme.colors.gray50}>
          {t('LOADING')}...
        </Text>
      </Flex>
    );

  return (
    <Container size="small">
      <Flex justify="space-between" align="center">
        <Avatar alt={nip05?.displayName || walias} size={20} src={nip05Avatar || lud16Avatar || domainAvatar} />
        {(lud16 || nip05?.lud16 || nip05?.lud06) && (
          <div>
            {hasTicket ? (
              <>
                <Button
                  onClick={() => onAddPower()}
                  variant="bezeled"
                  disabled={EMERGENCY_LOCK_POWER || !isAlive || closedPowerStatuses.includes(status)}
                >
                  <Bolt />
                  {t('ADD_POWER')}
                </Button>
              </>
            ) : (
              <Button onClick={() => onBuyTicket()} disabled={EMERGENCY_LOCK_TICKET || status !== 'SETUP'}>
                <Ticket />
                {t('BUY_TICKET')}
              </Button>
            )}
          </div>
        )}
      </Flex>
      <Divider y={8} />

      {nip05 && nip05.displayName ? (
        <>
          <Text isBold>{nip05.displayName}</Text>
          <Text>{walias}</Text>
        </>
      ) : (
        <Text isBold>{walias}</Text>
      )}
      {nip05?.about && (
        <>
          <Divider y={8} />
          <Text size="small">{nip05?.about || t('NO_DESCRIPTION')}</Text>
        </>
      )}

      {!hasTicket ? (
        <Flex gap={4}>
          <Text>{t('NOT_BUY_TICKET')}</Text>
        </Flex>
      ) : (
        <>
          <Divider y={12} />
          {isAlive ? (
            <>
              <Flex gap={4}>
                {hasTicket ? (
                  <>
                    <Badge color="primary">{t('PURCHASED_TICKET')}</Badge>
                    <Badge color="secondary">
                      <strong>#{rankingPosition}</strong>
                    </Badge>
                  </>
                ) : (
                  <Badge color="secondary">{t('NO_TICKET')}</Badge>
                )}
              </Flex>
              <>
                <Divider y={12} />
                <Text size="small" color={appTheme.colors.gray50}>
                  {t('SURVIVAL_CHANCE')}
                </Text>
                <Divider y={8} />
                {powerProgress > 0 && <Progress value={powerProgress} />}
              </>
            </>
          ) : (
            <>
              <Card spacing={4} variant="filled">
                <Flex align="center" gap={16}>
                  <Icon size={8}>
                    <Skull color={appTheme.colors.error} />
                  </Icon>
                  <Flex direction="column">
                    <Heading as="h4" color={appTheme.colors.error}>
                      {t('MASSACRED')}
                    </Heading>
                    {/* <Text color={appTheme.colors.error}>
                  {t('POSITION')} {`#${positionNumber}`}
                </Text> */}
                    <Text size="small">{t('SHITCOINED')}</Text>
                  </Flex>
                </Flex>
              </Card>
            </>
          )}
          <Divider y={12} />
          {/* Mostrar en el caso de haber salido ganador */}
          {/* <Card spacing={4} variant="filled">
        <Flex align="center" gap={16}>
          <Icon size={8}>
            <Crown color={appTheme.colors.secondary} />
          </Icon>
          <Flex direction="column">
            <Heading as="h4" color={appTheme.colors.secondary}>
              #1
            </Heading>
            <Text size="small">Saliste el mas capito.</Text>
          </Flex>
        </Flex>
      </Card>
      <Divider y={12} /> */}
          {/* Configurar para que al hacer click en la Tab se muestre el TabPanel correspondiente */}
          {hasTicket ? (
            <>
              <Divider y={12} />
              <Card spacing={4} variant="filled">
                <Flex align="center" gap={16}>
                  <Icon size={8}>
                    <Shield color={appTheme.colors.success} />
                  </Icon>
                  <Flex direction="column">
                    <Heading as="h4" color={appTheme.colors.success}>
                      {formatAmount(totalPower / 1000)}
                    </Heading>
                    <Text size="small">{t('ACCUMULATED_POWER')}</Text>
                  </Flex>
                </Flex>
              </Card>
              <Divider y={24} />

              <TransitionGroup className={styles.transactionElementsContainer}>
                {/* Mock Power Events */}
                {powerActions.map((powerEvent) => {
                  return (
                    <CSSTransition key={powerEvent.id} timeout={550} classNames="fade">
                      <ItemTxs
                        icon={powerActionVariants[powerEvent.type! as keyof typeof powerActionVariants]}
                        text={t('ADDED_POWER')}
                        type="power"
                        value={powerEvent.amount}
                        message={powerEvent.message}
                      />
                    </CSSTransition>
                  );
                })}
              </TransitionGroup>

              {/* Mock TicketEvent */}
              <ItemTxs icon={<Ticket color={appTheme.colors.primary} />} text={t('PURCHASED_TICKET')} />
              <Divider y={20} />
            </>
          ) : (
            <div>
              <Text size="small" align="center" color={appTheme.colors.gray50}>
                {t('CLOSE_INSCRIPTION_IN')}
              </Text>
              <Divider y={8} />
              <CountdownBox targetDate={targetDate} />
            </div>
          )}
        </>
      )}
    </Container>
  );
}
