import type { ReactNode } from 'react';
import { Text } from '@lawallet/ui';

import { BadgePrimitive } from './style';

interface BadgeProps {
  color: 'primary' | 'secondary';
  children: ReactNode;
}

export default function Badge(props: BadgeProps) {
  const { color, children } = props;

  return (
    <BadgePrimitive $color={color}>
      <Text size='small'>{children}</Text>
    </BadgePrimitive>
  );
}
