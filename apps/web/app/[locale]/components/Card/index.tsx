import type { ReactNode } from 'react';
import Image from 'next/image';

import { CardPrimitive } from './style';

interface CardProps {
  children: ReactNode;
  image: string;
  size?: 'small' | 'medium';
}

export default function Card(props: CardProps) {
  const { children, image, size = 'medium' } = props;

  return (
    <CardPrimitive $isSmall={size === 'small'}>
      <div>{children}</div>
      <Image src={image} height={150} width={150} alt="" />
    </CardPrimitive>
  );
}
