'use client';

import React, { useState } from 'react';
import { Container, Divider, Flex, Text, Button, Heading } from '@lawallet/ui';
import { useProfile } from '@lawallet/react';

import { Avatar } from '@/components/Avatar';
import Ticket from '@/components/Icons/Ticket';
import Bolt from '@/components/Icons/Bolt';
import Badge from '@/components/Badge';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@/components/Tabs';

import { appTheme } from '../../../config/exports';
import Progress from '@/components/Progress';
import InscriptionSheet from '@/components/InscriptionSheet/InscriptionSheet';

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
        <Flex align="center" gap={8}>
          <Progress value={valueProgress} />
          <Text>{valueProgress}%</Text>
        </Flex>
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
              <Flex direction="column" flex={1} align="center" justify="center">
                <Heading as="h4">Lorem, ipsum dolor.</Heading>
                <Text align="center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, impedit.</Text>
              </Flex>
            </TabPanel>
            <TabPanel show={showTab === 'zapeos'}>zapeos</TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <InscriptionSheet isOpen={isInscriptionOpen} onClose={() => setIsInscriptionOpen(false)} />
    </>
  );
}
