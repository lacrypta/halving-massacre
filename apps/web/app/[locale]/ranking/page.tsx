'use client';

// Libraries
import React, { useState } from 'react';
import Image from 'next/image';
import { Container, Divider, Flex, Heading } from '@lawallet/ui';

import { useMassacre } from '../../../hooks/useMassacre';

// Generic components
import { Navbar } from '../components/Navbar';

import pngIso from '../../../public/images/iso.png';
import { Link } from '../../../navigation';
import { RankingList } from '../components/RankingList';
import { Tab, TabList, Tabs, TabPanel, TabPanels } from '../components/Tabs';
import { GameTime } from '../components/GameTime';

interface PageProps {
  params: {
    lud16: string;
  };
}

export default function Page({ params }: PageProps): JSX.Element {
  const { top100Players: players } = useMassacre();

  const [nameTab, setNameTab] = useState('global');

  return (
    <>
      <Navbar />
      {/* <GameTime round={10} block="820.000" time="20" /> */}
      <Divider y={16} />
      <Flex direction="column" align="center">
        <Heading as="h1">Ranking</Heading>
        <Divider y={16} />
        <Heading align="center" as="h3">
          Top 100
        </Heading>

        <Divider y={16} />
        <Container size="small">
          <Tabs>
            <TabList>
              <Tab active={nameTab === 'global' && true} onClick={() => setNameTab('global')}>
                Global
              </Tab>
              <Tab active={nameTab === 'massacre' && true} onClick={() => setNameTab('massacre')} disabled={true}>
                Masacrados
              </Tab>
            </TabList>
          </Tabs>
          <TabPanels>
            <TabPanel show={nameTab === 'global' && true}>
              <Divider y={16} />
              <RankingList players={players} />
            </TabPanel>
            <TabPanel show={nameTab === 'massacre' && true}>
              <Divider y={16} />
              {/* Agregar listado de jugadores massacrados */}
              {/* <RankingList players={players} type="massacre" /> */}
            </TabPanel>
          </TabPanels>
        </Container>
      </Flex>
    </>
  );
}
