import styled, { css } from 'styled-components';

export const formControlBaseCss = css`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #dee0e6;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.fontDark};
  transition-property: ${({ theme }) => theme.transitions.defaultProperty};
  transition-duration: ${({ theme }) => theme.transitions.defaultDuration};
  transition-timing-function: ${({ theme }) => theme.transitions.defaultFunction};
`;

export const inputBaseCss = css`
  &::placeholder {
    color: ${({ theme }) => theme.colors.fontSecondary};
  }
  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryLighter};
  }
  &:not(:placeholder-shown) {
    border-color: ${({ theme }) => theme.colors.fontDark};
  }
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Card = styled.div`
  background-color: #fff;
  padding: 0.5rem 1.5rem;
  box-shadow: 0px 7px 16px rgba(232, 237, 243, 0.08);
  border-radius: 8px;
`;
