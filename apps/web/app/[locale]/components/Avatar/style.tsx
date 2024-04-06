import { styled } from 'styled-components';
import { appTheme } from '@/../config/exports';

const slot = 4;

interface AvatarPrimitiveProps {
  $size: number;
}

export const AvatarPrimitive = styled.div<AvatarPrimitiveProps>`
  position: relative;

  min-width: ${(props) => props.$size * slot}px;
  min-height: ${(props) => props.$size * slot}px;

  background-color: ${appTheme.colors.gray20};
  border-radius: 50%;

  img {
    border-radius: 50%;
  }
`;

interface AvatarBadgeStyleProps {
  $isSmall: boolean;
}

export const AvatarBadgeStyle = styled.div<AvatarBadgeStyleProps>`
  position: absolute;
  bottom: -2px;
  right: -2px;

  width: ${(props) => (props.$isSmall ? '16px' : '24px')};
  height: ${(props) => (props.$isSmall ? '16px' : '24px')};

  background-color: ${appTheme.colors.background};
  border: ${(props) => (props.$isSmall ? '2px' : '4px')} solid ${appTheme.colors.background};
  border-radius: 50px;
`;
