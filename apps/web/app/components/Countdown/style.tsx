import { styled } from 'styled-components';
import { appTheme } from '../../../config/exports';

export const CountdownPrimitive = styled.div`
  width: 100%;
  max-width: 280px;
`;

export const NumbersBox = styled.div`
  display: flex;

  color: ${appTheme.colors.secondary};

  h2 {
    line-height: inherit;
  }
`;
