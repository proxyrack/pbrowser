import styled from 'styled-components';

export const ContentContainer = styled.div`
  display: flex;
`;

export const Icon = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  & svg {
    fill: ${({ theme }) => theme.colors.dangerLighter};
    color: #fff;
  }

  & svg path {
    color: ${({ theme }) => theme.colors.dangerLighter};
  }
`;

export const Message = styled.div`
  word-break: break-word;
`;
