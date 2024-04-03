import React, { useState } from 'react';

// @lawallet/ui
import { Button, Container, Divider, Flex, Text, Heading } from '@lawallet/ui';

// New ui-components
import Badge from '@/components/Badge/index';
// import Progress from '@/components/Progress';
import { Avatar } from '@/components/Avatar';
import { Tabs } from '@/components/Tabs/Tabs';
import { TabList } from '@/components/Tabs/TabList';
import { Tab } from '@/components/Tabs/Tab';
import { TabPanels } from '@/components/Tabs/TabPanels';
import { TabPanel } from '@/components/Tabs/TabPanel';
import { Card } from '@/components/CardV2';
import { Icon } from '@/components/Icon';
import { Bolt, Heart, Skull, Shield, Ticket } from '@/components/Icons';

import { appTheme } from '../../../config/exports';

// Mock Data
import { zapEvents as mockZapEvents } from '../../../mocks/zapEvents';
import { userRounds } from '../../../mocks/rounds';

// Types
import type { Zap } from '../../../types/zap.js';

// Hooks
import { useProfile } from '@lawallet/react';
import { usePlayer } from '../../../hooks/usePlayer';
import { useMassacre } from '../../../hooks/useMassacre';

export interface PlayerDashboardInterface {
  walias: string;
  onAddPower: Function;
  onBuyTicket: Function;
}

export function PlayerDashboard({ walias, onBuyTicket }: PlayerDashboardInterface) {
  const { nip05, lud16, nip05Avatar, lud16Avatar, domainAvatar } = useProfile({ walias });
  const { hasTicket, isAlive } = usePlayer();
  // const { medianPower } = useMassacre();

  // const powerProgress = parseInt(Math.min(((power * 1000) / medianPower) * 100, 100).toFixed(2));

  const [showTab, setTab] = useState('zapeos');

  // Mock data
  const positionNumber = 554;

  return (
    <Container size="small">
      <Flex justify="space-between" align="center">
        <Avatar alt={nip05?.displayName || walias} size={20} src={nip05Avatar || lud16Avatar || domainAvatar} />
        {lud16 && (
          <div>
            {hasTicket ? (
              <>
                {/*
            Hidden while developing
            <Button onClick={() => onAddPower()} disabled={!isAlive}>
              <Bolt />
              Agregar poder
            </Button> */}
              </>
            ) : (
              <Button onClick={() => onBuyTicket()}>
                <Ticket />
                Comprar ticket
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
          <Text size="small">{nip05?.about || 'Sin descripción'}</Text>
        </>
      )}

      <Divider y={12} />

      {isAlive ? (
        <>
          <div>
            {hasTicket ? <Badge color="primary">Ticket adquirido</Badge> : <Badge color="secondary">Sin Ticket</Badge>}
          </div>
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
                  Masacrado
                </Heading>
                <Text color={appTheme.colors.error}>Posicion #${positionNumber}</Text>
                <Text size="small">Fuiste shitcoineado.</Text>
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
              Historial
            </Tab>
            <Tab disabled={true} active={showTab === 'rondas'} onClick={() => setTab('rondas')}>
              Rondas
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
                    <Text size="small">de poder acumulado.</Text>
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
                              {round.alive ? `+${round.powerIncrease}` : 'Massacrated'}
                            </Text>
                          </Flex>
                        ) : (
                          // In progress
                          <Flex justify="end">
                            <Text color={appTheme.colors.gray50}>In progress</Text>
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
                      400
                    </Heading>
                    <Text size="small">de poder aportado.</Text>
                  </Flex>
                </Flex>
              </Card>
              <Divider y={12} />
              {mockZapEvents.map((zap: Zap, k) => (
                <React.Fragment key={k}>
                  <Flex align="center" justify="space-between" gap={8}>
                    <Flex align="center" gap={8}>
                      <Bolt color={appTheme.colors.primary} />
                      <Text>Poder agregado</Text>
                    </Flex>
                    <Text color={appTheme.colors.gray50}>+{zap.amount / 1000}</Text>
                  </Flex>
                  <Divider y={20} />
                </React.Fragment>
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <div>Countdown</div>
      )}
    </Container>
  );
}
