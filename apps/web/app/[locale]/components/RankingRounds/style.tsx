import { styled } from 'styled-components';
import { appTheme } from '../../../../config/exports';

export const RankingRoundsStyle = styled.div`
  width: 100%;

  a {
    color: ${appTheme.colors.text};
  }
`;

export const ItemStyle = styled.div<{ $disabled: boolean }>`
  overflow: hidden;

  border-radius: 48px;

  ${(props) =>
    props.$disabled &&
    `
    cursor: not-allowed;
  `}

  a {
    display: flex;
    width: 100%;

    padding: 8px;

    ${(props) =>
      props.$disabled &&
      `
        pointer-events: none;
      `}

    &:hover {
      background-color: ${appTheme.colors.gray20};
    }
  }
`;

export const IconStyle = styled.div`
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 36px;
  height: 36px;

  background-color: ${appTheme.colors.gray20};
  border-radius: 50px;
`;
