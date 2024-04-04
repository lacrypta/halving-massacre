import { styled } from 'styled-components';

import { appTheme } from '@/../config/exports';

interface BadgePrimitiveProps {
  $color: 'primary' | 'secondary';
}

export const BadgePrimitive = styled.div<BadgePrimitiveProps>`
  display: inline-flex;
  width: auto;

  padding: 2px 10px;

  background-color: ${appTheme.colors.gray20};
  border-radius: 12px;

  color: ${(props) => appTheme.colors[props.$color]};
`;
