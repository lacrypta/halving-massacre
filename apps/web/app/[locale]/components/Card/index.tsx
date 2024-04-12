import type { ReactNode } from 'react';
import Image from 'next/image';

import { CardPrimitive, Animation } from './style';

interface CardProps {
  children: ReactNode;
  image?: string;
  size?: 'small' | 'medium';
  animation?: ReactNode;
}

export default function Card(props: CardProps) {
  const { children, image, size = 'medium', animation } = props;

  return (
    <CardPrimitive $isSmall={size === 'small'}>
      <div>{children}</div>
      {animation && <Animation $isSmall={size === 'small'}>{animation}</Animation>}
      {image && <Image src={image} height={150} width={150} alt="" />}
    </CardPrimitive>
  );
}
