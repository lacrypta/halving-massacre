import { Divider, Flex, Text } from '@lawallet/ui';

import { useTranslations } from 'next-intl';
import { HeaderPrimitive } from './style';

import Image from 'next/image';
import { useState } from 'react';
import { ImageM1, ImageM2, ImageSubContainer, ImageSword, ImagesContainer } from './style';

export default function Header() {
  const t = useTranslations();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <HeaderPrimitive>
      <Flex align="center" justify="center" direction="column">
        <ImagesContainer onMouseEnter={() => setIsHovered(true)} onAnimationEnd={() => setIsHovered(false)}>
          <ImageSubContainer>
            <ImageSword
              width={35}
              height={93}
              $isAnimating={isHovered}
              alt="Sword - Halving Massacre by La Crypta"
              src={'/images/logoAnimated/sword.png'}
            />
            <ImageM1
              width={51}
              height={34}
              alt="M1 - Halving Massacre by La Crypta"
              src={'/images/logoAnimated/m1.png'}
            />
            <ImageM2
              width={51}
              height={34}
              alt="M2 - Halving Massacre by La Crypta"
              src={'/images/logoAnimated/m2.png'}
            />
          </ImageSubContainer>
          <ImageSubContainer>
            <Image
              width={190}
              height={39}
              style={{ marginLeft: '-12px' }}
              alt="Halving - Halving Massacre by La Crypta"
              src={'/images/logoAnimated/halving.png'}
            />
            <Image
              width={203}
              height={34}
              style={{ marginTop: '5px' }}
              alt="Massacre - Halving Massacre by La Crypta"
              src={'/images/logoAnimated/assacre.png'}
            />
          </ImageSubContainer>
        </ImagesContainer>
        {/*Static image
           <Image width={240} height={77} alt="Halving Massacre by La Crypta" src={pngLogo.src} />
         */}
        <Divider y={12} />
        <Text align="center">{t('HEADER_DESC')}</Text>
        <Text align="center">{t('HEADER_DESC2')}</Text>
      </Flex>
    </HeaderPrimitive>
  );
}
