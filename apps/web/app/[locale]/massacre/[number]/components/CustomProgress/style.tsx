import { styled } from 'styled-components';
import { appTheme } from '../../../../../../config/exports';

export const CustomProgressStyle = styled.div`
  display: flex;
  gap: 2px;
  width: 100%;
  height: 32px;

  div {
    &:first-child {
      background-color: ${appTheme.colors.primary};
      border-radius: 24px 0 0 24px;
    }
    &:last-child {
      background-color: ${appTheme.colors.secondary};
      border-radius: 0 24px 24px 0;
    }
  }
`;

interface ValueStyleProps {
  $width: number;
}

export const ValueStyle = styled.div<ValueStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.$width}%;
  height: 100%;

  color: ${appTheme.colors.black};
`;
