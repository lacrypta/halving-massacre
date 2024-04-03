import { styled } from 'styled-components';

const slot = 4;

export interface IconStyleProps {
  $size: 3 | 4 | 5 | 6 | 7 | 8;
}

export const IconStyle = styled.div<IconStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: ${(props) => props.$size * slot}px;
  min-height: ${(props) => props.$size * slot}px;

  svg,
  img {
    width: 100%;
    height: 100%;
  }
`;
