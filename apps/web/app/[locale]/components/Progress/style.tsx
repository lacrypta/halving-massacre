import { styled } from 'styled-components';

interface ValueProps {
  $width: number;
}

export const ProgressPrimitive = styled.div`
  position: relative;
  overflow: hidden;

  width: 100%;
  height: 32px;

  background-color: ${(props) => props.theme.colors.gray25};
  border-radius: 24px;

  transition-duration: 0.4s;
`;

export const Value = styled.div<ValueProps>`
  width: ${(props) => props.$width}%;
  height: 100%;

  background-color: ${(props) => props.theme.colors.success};
`;

export const TextValue = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
