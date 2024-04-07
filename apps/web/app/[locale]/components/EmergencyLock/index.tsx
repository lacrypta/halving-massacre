'use client';

import { Flex, Heading, Text, Divider } from '@lawallet/ui';

import { appTheme } from '../../../../config/exports';

import errorImage from '../../../../public/images/error.jpg';
import Image from 'next/image';

export function EmergencyLock() {
  return (
    <Flex direction="column" flex={1} align="center" justify="center" gap={8}>
      <Image src={errorImage} width={400} height={400} alt="" />
      <Divider y={16} />
      <Heading color={appTheme.colors.error}>404</Heading>
      <Text>Fixing bugs. Be right back</Text>
    </Flex>
  );
}
