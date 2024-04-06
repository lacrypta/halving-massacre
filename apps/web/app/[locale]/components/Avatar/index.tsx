import Image from 'next/image';

import { appTheme } from '../../../../config/exports';

import { Icon } from '../Icon';
import { Check } from '../Icons/Check';

import { AvatarPrimitive, AvatarBadgeStyle } from './style';

interface AvatarProps {
  src: string;
  alt: string;
  size: number;
  checked?: boolean;
}

export function Avatar({ src = '', alt, size, checked = false }: AvatarProps) {
  return (
    <AvatarPrimitive $size={size}>
      <Image src={src} alt={alt} fill />
      {src && checked && (
        <AvatarBadgeStyle $isSmall={size <= 12}>
          <Icon>
            <Check color={appTheme.colors.success} />
          </Icon>
        </AvatarBadgeStyle>
      )}
    </AvatarPrimitive>
  );
}
