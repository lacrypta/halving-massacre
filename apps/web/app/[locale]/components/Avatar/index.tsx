import Image from 'next/image';

import { AvatarPrimitive } from './style';

interface AvatarProps {
  src: string;
  alt: string;
  size: number;
}

export function Avatar({ src, alt, size }: AvatarProps) {
  return (
    <AvatarPrimitive $size={size}>
      <Image src={src} alt={alt} fill />
    </AvatarPrimitive>
  );
}
