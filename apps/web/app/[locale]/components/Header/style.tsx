import { styled, keyframes, css } from 'styled-components';

export const HeaderPrimitive = styled.div`
  max-width: 400px;
`;

const upAndDown = keyframes`
  0% { transform: translateY(0) translateX(0)}
  50% { transform: translateY(-40px) translateX(-10px); }
  100% { transform: translateY(0) translateX(0); }
`;

export const ImagesContainer = styled.div`
  display: flex;
`;

export const ImageSubContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageM1 = styled.img`
  position: relative;
  margin-top: -40px;
  margin-left: 0;
  z-index: 2;
`;

export const ImageSword = styled.img<{ $isAnimating: boolean }>`
  position: relative;
  margin-top: -10px;
  margin-left: 13px;
  z-index: 1;
  ${({ $isAnimating }) =>
    $isAnimating &&
    css`
      animation: ${upAndDown} 1s forwards;
    `}
`;

export const ImageM2 = styled.img`
  position: relative;
  margin-top: -34px;
  margin-left: 0px;
  z-index: 0;
`;
