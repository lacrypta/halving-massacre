'use client';

import React, { useState } from 'react';
import { Container, Divider, Flex, Text, Button, Heading, Input } from '@lawallet/ui';
import { useProfile } from '@lawallet/react';

import { Avatar } from '@/components/Avatar';
import Ticket from '@/components/Icons/Ticket';
import Bolt from '@/components/Icons/Bolt';
import Badge from '@/components/Badge';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@/components/Tabs';

import { appTheme } from '../../../config/exports';
import Progress from '@/components/Progress';
import InscriptionSheet from '@/components/InscriptionSheet/InscriptionSheet';

// Mock Data
import { zapEvents as mockZapEvents } from '../../../mocks/zapEvents';
import { userRounds } from '../../../mocks/rounds';

import type { Zap } from '../../../types/zap';
import Link from '@/components/Icons/Link';

interface PageProps {
  params: {
    lud16: string;
  };
}

export default function Page({ params }: PageProps): JSX.Element {
  const walias = decodeURIComponent(params.lud16);
  const { nip05, nip05Avatar, lud16Avatar, domainAvatar } = useProfile({ walias });
  const [isInscriptionOpen, setIsInscriptionOpen] = useState(false);

  const hasTicket = false;
  const valueProgress = 10;
  const isDeath = false;

  const [showTab, setTab] = useState('rondas');

  return (
    <>
      <Divider y={64} />
      <Container size="small">
        <Flex justify="space-between" align="center">
          <Avatar alt={nip05?.displayName || walias} size={20} src={nip05Avatar || lud16Avatar || domainAvatar} />
          <div>
            {hasTicket ? (
              <Button onClick={() => null} variant="bezeled" disabled={isDeath}>
                <Bolt />
                Agregar poder
              </Button>
            ) : (
              <Button onClick={() => setIsInscriptionOpen(true)} variant="bezeled">
                <Ticket />
                Comprar ticket
              </Button>
            )}
          </div>
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
        <div>
          {hasTicket ? <Badge color="primary">Ticket adquirido</Badge> : <Badge color="secondary">Sin Ticket</Badge>}
        </div>
        <Divider y={12} />
        <Text size="small" color={appTheme.colors.gray50}>
          Chances de sobrevivir la ronda
        </Text>
        <Divider y={8} />
        <Progress value={valueProgress} />
        <Divider y={12} />

        {/* Configurar para que al hacer click en la Tab se muestre el TabPanel correspondiente */}
        <Tabs>
          <TabList>
            <Tab active={showTab === 'rondas'} onClick={() => setTab('rondas')}>
              Rondas
            </Tab>
            <Tab active={showTab === 'zapeos'} onClick={() => setTab('zapeos')}>
              Zapeos
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel show={showTab === 'rondas'}>
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
                        <Flex align="start" gap={8}>
                          <Link />
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
              {mockZapEvents.map((zap: Zap, k) => (
                <React.Fragment key={k}>
                  <Flex align="center" justify="space-between" gap={8}>
                    <Flex align="start" gap={8}>
                      <Link />
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
      </Container>
      <InscriptionSheet isOpen={isInscriptionOpen} onClose={() => setIsInscriptionOpen(false)} />
    </>
  );
}
