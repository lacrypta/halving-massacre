'use client';

// Libraries
import React, { useState } from 'react';
import Image from 'next/image';
import { ButtonGroup, Container, Divider, Flex, Heading, Text } from '@lawallet/ui';

// Generic components
import { Navbar } from '../components/Navbar';

import pngIso from '../../../public/images/iso.png';
import { Link } from '../../../navigation';
import { AutoAvatar } from '../components/AutoAvatar';
import { Bolt } from '../components/Icons';
import { appTheme } from '../../../config/exports';
import { useRouter } from 'next/navigation';
import { useMassacre } from '../../../hooks/useMassacre';

interface PageProps {
  params: {
    lud16: string;
  };
}

export default function Page({ params }: PageProps): JSX.Element {
  const router = useRouter();
  const { top100Players: players } = useMassacre();
  return (
    <>
      <Navbar>
        <Link href="/">
          <Image width={23} height={30} alt="Halving Massacre by La Crypta" src={pngIso} />
        </Link>
      </Navbar>
      <Divider y={16} />
      <Flex direction="column" align="center">
        <Heading as="h1">Ranking</Heading>
        <Divider y={16} />
        <Heading align="center" as="h3">
          Top 100
        </Heading>

        <Divider y={20} />
        <Container size="small">
          <Flex align="center" gap={16} direction="column" justify="center">
            {Object.keys(players).map((walias) => {
              return (
                <ButtonGroup key={walias}>
                  <Flex onClick={() => router.push(`/profile/${walias}`)} align="center" justify="start" gap={16}>
                    <Flex align="center" gap={8}>
                      <AutoAvatar walias={walias} size={12} />
                      <Text>{walias}</Text>
                    </Flex>
                    <Flex justify="end">
                      <Text color={appTheme.colors.primary}>
                        <Bolt /> {String(players[walias]) || '21'} sats
                      </Text>
                    </Flex>
                  </Flex>
                </ButtonGroup>
              );
            })}
          </Flex>
        </Container>
      </Flex>
    </>
  );
}
