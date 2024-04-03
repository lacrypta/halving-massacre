import React, { type ReactNode } from 'react';

import { IconStyle } from './style';

export interface IconProps {
  children: ReactNode;
  size?: 3 | 4 | 5 | 6 | 7 | 8;
}

export function Icon(props: IconProps) {
  const { children, size = 3 } = props;

  return <IconStyle $size={size}>{children}</IconStyle>;
}
