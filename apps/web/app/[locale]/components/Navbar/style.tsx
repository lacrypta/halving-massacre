import { styled } from 'styled-components';

export const NavbarStyle = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

interface SubnavbarStyleProps {
  $background: string;
}

export const SubnavbarStyle = styled.div<SubnavbarStyleProps>`
  height: 60px;

  background-color: ${(props) => props.$background};
`;
