import { styled } from 'styled-components';

import { appTheme } from '@/../config/exports';

export const BadgePrimitive = styled.div`
  display: inline-flex;
  width: auto;

  padding: 2px 10px;

  background-color: ${appTheme.colors.gray20};
  border-radius: 12px;

  p {
    white-space: nowrap;
  }
`;
