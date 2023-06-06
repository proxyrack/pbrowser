import styled from 'styled-components';

export const Heading = styled.h1`
  margin-top: 0.625rem;
  margin-bottom: 2.125rem;
  font-weight: 700;
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.fontDark};
`;
