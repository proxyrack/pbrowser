import styled from 'styled-components';

export const ContentBox2Cols = styled.div`
  width: 100%;
  display: flex;
  column-gap: 1.5rem;
`;
export const FieldsetContainer = styled.div`
  width: 100%;
  flex: 1;
`;
export const SummaryContainer = styled.div`
  width: 350px;
  background-color: #fff;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  border-radius: 8px;
`;
export const SummaryTitle = styled.div`
  padding-top: 1rem;
  padding-bottom: 2rem;
  color: ${({ theme }) => theme.colors.fontDark};
  font-weight: 500;
`;
