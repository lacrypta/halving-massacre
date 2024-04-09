import { styled } from 'styled-components';

import { appTheme } from '../../../../config/exports';

export const ItemTxsStyle = styled.div`
  position: relative;

  width: 100%;

  > div:first-child {
    position: relative;
    z-index: 1;
  }

  a {
    color: ${appTheme.colors.text};
  }
`;

export const IconStyle = styled.div`
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;

  background-color: ${appTheme.colors.gray20};
  border-radius: 50px;
`;

export const MessageStyle = styled.div`
  display: flex;

  margin-top: 8px;

  > div:first-child {
    position: relative;
    top: -10px;
    z-index: 0;

    display: flex;
    justify-content: center;
    width: 37px;
  }

  > div:last-child {
    overflow: hidden;
    max-width: 270px;
  }
`;

export const IndicatorStyle = styled.div`
  width: 12px;
  height: 23px;

  background-color: transparent;
  border-radius: 0 0 0 4px;
  border-left: 2px solid ${appTheme.colors.gray20};
  border-bottom: 2px solid ${appTheme.colors.gray20};
`;
