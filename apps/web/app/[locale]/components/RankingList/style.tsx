import { styled } from 'styled-components';
import { appTheme } from '../../../../config/exports';

export const RankingListStyle = styled.div`
  width: 100%;
`;

interface ItemStyleProps {
  $isActive?: boolean;
}

export const ItemStyle = styled.a<ItemStyleProps>`
  width: 100%;

  padding: 8px;

  background-color: ${(props) => (props.$isActive ? appTheme.colors.gray20 : 'transparent')};
  border-radius: 50px;

  a {
    color: ${appTheme.colors.text};
  }

  &:hover {
    background-color: ${appTheme.colors.gray20};
  }
`;

export const NumberStyle = styled.div`
  display: flex;
  justify-content: center;
  min-width: 40px;
`;

export const WaliasStyle = styled.div`
  width: 100%;

  p {
    width: 100%;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (min-width: 768px) {
      max-width: 200px;
    }
  }
`;
