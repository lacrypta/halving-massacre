import { useState } from 'react';
import Image from 'next/image';
import { ImageSword, ImagesContainer } from './style';

export function IsoAnimated() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ImagesContainer onMouseEnter={() => setIsHovered(true)} onAnimationEnd={() => setIsHovered(false)}>
      <ImageSword
        width={12}
        height={30}
        $isAnimating={isHovered}
        alt="Sword - Halving Massacre by La Crypta"
        src={'/images/isoAnimated/sword.png'}
      />
      <Image width={10} height={30} alt="H - Halving Massacre by La Crypta" src={'/images/isoAnimated/h.png'} />
    </ImagesContainer>
  );
}
