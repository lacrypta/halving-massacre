import { styled, keyframes, css } from 'styled-components';

const upAndDown = keyframes`
  0% { transform: translateY(0) translateX(0);}
  50% { transform: translateY(-10px) translateX(-4px); }
  100% { transform: translateY(0) translateX(0); }
`;

export const ImageSword = styled.img<{ isAnimating: boolean }>`
  ${({ isAnimating }) =>
    isAnimating &&
    css`
      animation: ${upAndDown} 1s forwards;
    `}
`;

export const ImagesContainer = styled.div`
  display: flex;
`;
