import { formControlBaseCss } from 'renderer/styles/sharedStyles';
import styled from 'styled-components';

export const ButtonGroupBox = styled.div`
  & label:not(:last-child) {
    margin-right: 1rem;
  }
`;

export const ButtonBox = styled.label`
  display: inline-block;
`;

export const Radio = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;

  :checked + span {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLighter}1A;
  }
`;

export const Button = styled.span`
  ${formControlBaseCss};
  display: inline-block;
  cursor: pointer;
  background-color: #fff;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.fontSecondary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
