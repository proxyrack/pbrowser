import styled from 'styled-components';

export const Container = styled.div``;

export const Row = styled.div`
  width: 100%;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.fontSecondary};
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
`;

export const Label = styled.span`
  font-weight: 500;
`;

export const Value = styled.span``;
