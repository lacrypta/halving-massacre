import { styled } from 'styled-components';
import { appTheme } from '@/../config/exports';

const slot = 4;

interface AvatarPrimitiveProps {
  $size: number;
}

export const AvatarPrimitive = styled.div<AvatarPrimitiveProps>`
  position: relative;
  overflow: hidden;

  width: ${(props) => props.$size * slot}px;
  height: ${(props) => props.$size * slot}px;

  background-color: ${appTheme.colors.gray20};
  border-radius: 50%;
`;
