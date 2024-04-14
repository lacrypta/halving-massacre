import { styled } from 'styled-components';
import { appTheme } from '../../../../config/exports';

export const NavbarStyle = styled.nav`
  position: relative;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

export const UserButton = styled.button<{ $background: string }>`
  position: relative;
  z-index: 0;

  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 40px;

  padding: 4px 8px;

  background-color: ${(props) => props.$background};
  border: none;
  border-radius: 100px;

  cursor: pointer;
`;

interface UserMenuProps {
  $show: boolean;
}

export const UserMenu = styled.div<UserMenuProps>`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  overflow: hidden;

  display: ${(props) => (props.$show ? 'flex' : 'none')};
  flex-direction: column;
  gap: 4px;
  width: 100%;
  min-width: 300px;

  background-color: ${appTheme.colors.gray15};
  border-radius: 12px;
  border: 1px solid ${appTheme.colors.gray20};
`;

export const UserButtonMenu = styled.div`
  position: relative;
`;

export const UserMenuHead = styled.button`
  display: flex;
  align-items: center;
  min-height: 40px;

  padding: 0 16px;

  border-radius: 12px 12px 0 0;
  border: none;
  background-color: transparent;
`;

export const UserMenuBody = styled.div``;
export const UserMenuItem = styled.div``;
export const UserMenuFooter = styled.div`
  border-top: 1px solid ${appTheme.colors.gray20};

  button,
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 50px;
    width: 100%;

    padding: 0 12px;

    background-color: transparent;
    border: none;

    color: ${appTheme.colors.text};
  }
`;
