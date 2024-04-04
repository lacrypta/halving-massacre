import styled from 'styled-components';

import { appTheme } from '@/../config/exports';

type CheckedProp = { checked: boolean };

export const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  border-bottom: 1px solid #404040;

  &:last-child {
    border-bottom: none;
  }
`;

export const RadioItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 16px;

  cursor: pointer;
  transition: all 300ms;
`;

export const RadioInput = styled.input`
  visibility: hidden;
`;

export const CheckDiv = styled.div<CheckedProp>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${appTheme.colors.gray50};
  border-radius: 100%;
  height: 25px;
  width: 25px;
  transition: border 300ms linear;

  &:hover {
    border: 2px solid ${appTheme.colors.primary};
  }

  &::before {
    content: '';
    border-radius: 100%;
    height: 9px;
    width: 9px;
    transition: background 300ms linear;
    background: ${(props) => (props.checked ? appTheme.colors.primary : 'transparent')};
  }
`;
