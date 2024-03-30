import { styled } from 'styled-components';

interface ValueProps {
  $width: number;
}

export const ProgressPrimitive = styled.div`
  overflow: hidden;

  width: 100%;
  height: 16px;

  background-color: ${(props) => props.theme.colors.gray35};
  border-radius: 12px;

  transition-duration: 0.4s;
`;

export const Value = styled.div<ValueProps>`
  width: ${(props) => props.$width}%;
  height: 100%;

  background-color: ${(props) => props.theme.colors.success};
`;
