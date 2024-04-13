import { styled } from 'styled-components';

export const GameTimeStyle = styled.div<{ $background: string }>`
  height: 60px;

  background-color: ${(props) => props.$background};
`;
