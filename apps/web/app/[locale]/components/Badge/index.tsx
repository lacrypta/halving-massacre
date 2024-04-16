import type { ReactNode } from 'react';
import { Text } from '@lawallet/ui';

import { BadgePrimitive } from './style';
import { appTheme } from '../../../../config/exports';

interface BadgeProps {
  color: 'primary' | 'secondary' | 'success' | 'warning';
  children: ReactNode;
}

export default function Badge(props: BadgeProps) {
  const { color, children } = props;

  return (
    <BadgePrimitive>
      <Text size="small" color={appTheme.colors[color]}>
        {children}
      </Text>
    </BadgePrimitive>
  );
}
