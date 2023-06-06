import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-flex;
  width: 100%;
`;

export const Paragraph = styled.p<{ collapsed: boolean }>`
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${({ collapsed }) => (collapsed ? '1' : 'unset')};
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: fit-content;
`;

export const Toggle = styled.button`
  width: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.fontSecondary};
  border: none;
  background-color: unset;
  padding: 0;

  & :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
