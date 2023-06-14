import styled from 'styled-components';

export const RadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Radio = styled.input`
  appearance: none;
  margin: 0;
  width: 1.5rem;
  height: 1.5rem;
  border-width: 2px;
  border-style: solid;
  border-color: #dee0e6;
  border-radius: 50%;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryLight};
  }

  &:active {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    background-color: #efefef;
    border-color: #262d3e66;
  }

  &:checked {
    border-width: 6px;
    border-color: ${({ theme }) => theme.colors.primary};
    &:hover {
      border-color: ${({ theme }) => theme.colors.primaryLight};
    }
    &:disabled {
      border-color: #262d3e66;
      &::after {
        background-color: #efefef;
      }
    }
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 0.75rem;
      height: 0.75rem;
      background-color: #fff;
    }
  }
`;

export const Label = styled.label`
  font-size: 0.875rem;
  margin-left: 1.5rem;
`;
