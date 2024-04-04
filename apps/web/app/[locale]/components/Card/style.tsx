import { styled } from 'styled-components';
import { appTheme } from '@/../config/exports';

interface CardPrimitiveProps {
  $isSmall: boolean;
}

export const CardPrimitive = styled.div<CardPrimitiveProps>`
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: ${(props) => (props.$isSmall ? 'center' : 'flex-start')};
  width: 100%;
  height: ${(props) => (props.$isSmall ? '100px' : '160px')};

  padding: ${(props) => (props.$isSmall ? '0 24px' : '12px')};

  background: ${appTheme.colors.gray15};
  border-radius: 12px;

  @media screen and (min-width: 768px) {
    height: 150px;

    padding: 24px;
  }

  div {
    position: relative;
    z-index: 1;

    display: flex;
    flex-direction: column;
    gap: 0;

    h2 {
      line-height: inherit;
    }
  }

  img {
    position: absolute;
    top: ${(props) => (props.$isSmall ? '-10px' : '50px')};
    right: ${(props) => (props.$isSmall ? '-20px' : '-10px')};
    z-index: 0;

    @media screen and (min-width: 768px) {
      top: 20px;
      right: 0;
      transform: scale(1.3);
    }
  }
`;
