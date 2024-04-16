import { styled } from 'styled-components';
import { appTheme } from '../../../../config/exports';

export const GameTimeStyle = styled.div<{ $background: string }>`
  height: 60px;

  background-color: ${(props) => props.$background};

  color: ${appTheme.colors.text} !important;
`;
