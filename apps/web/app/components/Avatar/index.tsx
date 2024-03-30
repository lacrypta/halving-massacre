import Image from 'next/image';

import { AvatarPrimitive } from './style';

interface AvatarPrimitive {
  src: string;
  alt: string;
  size: number;
}

export function Avatar(props: AvatarPrimitive) {
  const { src, alt, size } = props;

  return (
    <AvatarPrimitive $size={size}>
      <Image src={src} alt={alt} fill />
    </AvatarPrimitive>
  );
}
