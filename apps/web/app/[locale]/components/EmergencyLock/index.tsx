'use client';

import Image from 'next/image';
import { Flex, Heading, Divider, Container } from '@lawallet/ui';

import { appTheme } from '../../../../config/exports';

import errorImage from '../../../../public/images/error.jpg';

interface EmergencyLockProps {
  message?: string;
}

export function EmergencyLock(props: EmergencyLockProps) {
  const { message = '' } = props;

  return (
    <Flex direction="column" flex={1} align="center" justify="center" gap={8}>
      <Image src={errorImage} width={400} height={400} alt="" />
      <Divider y={16} />
      {message && (
        <Container>
          <Heading align="center" color={appTheme.colors.error}>
            {message}
          </Heading>
        </Container>
      )}
    </Flex>
  );
}
