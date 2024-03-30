import { styled } from 'styled-components';
import { appTheme } from '../../../config/exports';

export const TabsStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const TabListStyle = styled.div`
  display: flex;
  gap: 8px;

  padding: 0 16px;

  border-bottom: 1px solid ${appTheme.colors.gray20};
`;

interface TabStyleProps {
  $active: boolean;
}

export const TabStyle = styled.div<TabStyleProps>`
  display: flex;
  flex: 1;

  padding: 4px 0;

  border-bottom: 1px solid ${(props) => (props.$active ? appTheme.colors.primary : 'transparent')};

  button {
    flex: 1;

    border-radius: 8px;

    color: ${appTheme.colors.text};

    &:hover {
      background-color: ${appTheme.colors.gray20};
    }
  }
`;

export const TabPanelsStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 0 16px;
`;

interface TabPanelStyleProps {
  $show: boolean;
}

export const TabPanelStyle = styled.div<TabPanelStyleProps>`
  display: ${(props) => (props.$show ? 'flex' : 'none')};
  flex: 1;
`;
