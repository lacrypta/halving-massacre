import { styled } from 'styled-components';

export const FinalUserStyle = styled.div<{ $showQr: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;

  ${(props) =>
    props.$showQr &&
    `
    > div {
      &:last-child {
        display: none;
  
        @media screen and (min-width: 768px) {
          display: flex;
        }
      }
    }
  `}

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    width: 100%;
    max-width: 150px;
  }
`;
