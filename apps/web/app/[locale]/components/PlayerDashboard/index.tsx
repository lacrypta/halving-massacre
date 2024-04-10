import React, { useEffect, useState } from 'react';

// @lawallet/ui
import { Button, Container, Divider, Flex, Heading, Text } from '@lawallet/ui';

// New ui-components
import Badge from '../Badge/index';
// import Progress from '../Progress';
import { Avatar } from '../Avatar';
import { Card } from '../CardV2';
import { Icon } from '../Icon';
import { Bolt, Heart, Loader, Shield, Skull, Ticket } from '../Icons';
import { Tab } from '../Tabs/Tab';
import { TabList } from '../Tabs/TabList';
import { TabPanel } from '../Tabs/TabPanel';
import { TabPanels } from '../Tabs/TabPanels';
import { Tabs } from '../Tabs/Tabs';

const NEXT_PUBLIC_TARGET_COUNTDOWN = process.env.NEXT_PUBLIC_TARGET_COUNTDOWN! || '2024-04-13T12:00:00';
const targetDate: Date = new Date(NEXT_PUBLIC_TARGET_COUNTDOWN);

import { appTheme } from '@/../config/exports';

// Mock Data
import { userRounds } from '@/../mocks/rounds';

// Hooks
import { usePlayer } from '@/../hooks/usePlayer';
import { useProfile } from '@lawallet/react';
import CountdownBox from '../CountdownBox';
import { useTranslations } from 'next-intl';
import { usePowerEvents } from '../../../../hooks/usePowerEvents';
import { ItemTxs } from '../ItemTxs';

export interface PlayerDashboardInterface {
  walias: string;
  onAddPower: Function;
  onBuyTicket: Function;
}

export function PlayerDashboard({ walias, onBuyTicket, onAddPower }: PlayerDashboardInterface) {
  const { nip05, lud16, nip05Avatar, lud16Avatar, domainAvatar } = useProfile({ walias });
  const { hasTicket, isAlive } = usePlayer(); // TODO: return totalPower
  const { powerActions } = usePowerEvents(walias);
  const [totalPower, setTotalPower] = useState(0); // TODO: should be get from usePlayer

  // const { medianPower } = useMassacre();

  const t = useTranslations();

  // const powerProgress = parseInt(Math.min(((power * 1000) / medianPower) * 100, 100).toFixed(2));

  const [showTab, setTab] = useState('zapeos');

  // Mock data
  const positionNumber = 554;

  useEffect(() => {
    setTotalPower(powerActions.reduce((a, b) => a + b.amount, 0));
  }, [powerActions]);

  if (!lud16)
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
        {lud16 && (
          <div>
            {hasTicket ? (
              <>
                <Button onClick={() => onAddPower()} variant="bezeled" disabled={!isAlive}>
                  <Bolt />
                  {t('ADD_POWER')}
                </Button>
              </>
            ) : (
              <Button onClick={() => onBuyTicket()}>
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

      <Divider y={12} />

      {isAlive ? (
        <>
          <Flex gap={4}>
            {hasTicket ? (
              <>
                <Badge color="primary">{t('PURCHASED_TICKET')}</Badge>
                {/* <Badge color="secondary">
                  {t('POSITION')} <strong>#30</strong>
                </Badge> */}
              </>
            ) : (
              <Badge color="secondary">{t('NO_TICKET')}</Badge>
            )}
          </Flex>
          <>
            {/* <Divider y={12} />
            <Text size="small" color={appTheme.colors.gray50}>
              Chances de sobrevivir la ronda
            </Text>
            <Divider y={8} />
            <Progress value={powerProgress} /> */}
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
                <Text color={appTheme.colors.error}>
                  {t('POSITION')} #${positionNumber}
                </Text>
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
        <Tabs>
          <TabList>
            <Tab active={showTab === 'zapeos'} onClick={() => setTab('zapeos')}>
              {t('HISTORY')}
            </Tab>
            <Tab disabled={true} active={showTab === 'rondas'} onClick={() => setTab('rondas')}>
              {t('ROUNDS')}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel show={showTab === 'rondas'}>
              <Divider y={12} />
              <Card spacing={4} variant="filled">
                <Flex align="center" gap={16}>
                  <Icon size={8}>
                    <Shield color={appTheme.colors.success} />
                  </Icon>
                  <Flex direction="column">
                    <Heading as="h4" color={appTheme.colors.success}>
                      100.000
                    </Heading>
                    <Text size="small">{t('ACCUMULATED_POWER')}</Text>
                  </Flex>
                </Flex>
              </Card>
              <Divider y={12} />
              {/* Mostrar en caso de que no tenga rondas actuales */}
              {/* <Flex direction="column" flex={1} align="center" justify="center">
                <Heading as="h4">Lorem, ipsum dolor.</Heading>
                <Text align="center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, impedit.</Text>
              </Flex> */}
              {/* Mostrar en el caso de que tenga rondas */}
              <Flex direction="column" flex={1} align="center">
                {userRounds
                  .sort((a, b) => b.index - a.index)
                  .map((round, k) => (
                    <React.Fragment key={k}>
                      <Flex align="center" justify="start" gap={8}>
                        <Flex align="center" gap={8}>
                          {/* Listado de iconos: */}
                          {/* <Heart color={appTheme.colors.success} />
                          <Skull color={appTheme.colors.error} />
                          <Crown color={appTheme.colors.secondary} />
                          <Sword color={appTheme.colors.primary} /> */}
                          {!round.alive ? (
                            <Skull color={appTheme.colors.error} />
                          ) : (
                            <Heart color={appTheme.colors.success} />
                          )}
                          <Text>{round.name}</Text>
                        </Flex>
                        {!round.finished ? (
                          // Finished Round
                          <Flex justify="end">
                            <Text color={round.alive ? appTheme.colors.gray50 : appTheme.colors.error}>
                              {round.alive ? `+${round.powerIncrease}` : t('MASSACRED')}
                            </Text>
                          </Flex>
                        ) : (
                          // In progress
                          <Flex justify="end">
                            <Text color={appTheme.colors.gray50}>{t('IN_PROGRESS')}</Text>
                          </Flex>
                        )}
                      </Flex>
                      <Divider y={20} />
                    </React.Fragment>
                  ))}
              </Flex>
            </TabPanel>
            <TabPanel show={showTab === 'zapeos'}>
              <Divider y={12} />
              <Card spacing={4} variant="filled">
                <Flex align="center" gap={16}>
                  <Icon size={8}>
                    <Bolt color={appTheme.colors.primary} />
                  </Icon>
                  <Flex direction="column">
                    <Heading as="h4" color={appTheme.colors.primary}>
                      {totalPower / 1000}
                    </Heading>
                    <Text size="small">{t('CONTRIBUTED_POWER')}</Text>
                  </Flex>
                </Flex>
              </Card>
              <Divider y={24} />

              <React.Fragment>
                {/* Mock Power Events */}
                {powerActions.map((powerEvent) => {
                  return (
                    <React.Fragment key={powerEvent.id}>
                      <ItemTxs
                        icon={<Bolt color={appTheme.colors.primary} />}
                        text={t('ADDED_POWER')}
                        type="power"
                        value={powerEvent.amount}
                        message={powerEvent.message}
                      />
                    </React.Fragment>
                  );
                })}

                {/* Mock TicketEvent */}
                <ItemTxs icon={<Ticket color={appTheme.colors.primary} />} text={t('PURCHASED_TICKET')} />
                <Divider y={20} />
              </React.Fragment>
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <div>
          <Text size="small" align="center" color={appTheme.colors.gray50}>
            {t('CLOSE_INSCRIPTION_IN')}
          </Text>
          <Divider y={8} />
          <CountdownBox targetDate={targetDate} />
        </div>
      )}
    </Container>
  );
}
