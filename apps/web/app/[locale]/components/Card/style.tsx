import { styled } from 'styled-components';
import { appTheme } from '@/../config/exports';

interface CardPrimitiveProps {
  $isSmall: boolean;
}

interface AnimationProps {
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

export const Animation = styled.div<AnimationProps>`
  position: absolute;
  top: ${(props) => (props.$isSmall ? '0rem' : '-2rem')};
  right: ${(props) => (props.$isSmall ? '-7rem' : '-1rem')};
  z-index: 0;

  @media screen and (min-width: 600px) and (max-width: 768px) {
    top: ${(props) => (props.$isSmall ? '0rem' : '-1.2rem')};
    right: ${(props) => (props.$isSmall ? '-4rem' : '-0.6rem')};
  }

  @media screen and (min-width: 480px) and (max-width: 600px) {
    top: ${(props) => (props.$isSmall ? '0rem' : '-1.2rem')};
    right: ${(props) => (props.$isSmall ? '-2rem' : '0rem')};
  }

  @media screen and (min-width: 300px) and (max-width: 480px) {
    top: ${(props) => (props.$isSmall ? '0rem' : '-0.2rem')};
    right: ${(props) => (props.$isSmall ? '-2rem' : '0rem')};
  }
`;
