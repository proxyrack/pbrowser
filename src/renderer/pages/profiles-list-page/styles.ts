import { Card } from 'renderer/styles/sharedStyles';
import styled from 'styled-components';

export { Card };

export const Table = styled.table`
  width: 100%;
  font-size: 0.875rem;

  & th {
    text-align: left;
    color: ${({ theme }) => theme.colors.fontSecondary};
    padding: 0.75rem 0.5rem;
    font-weight: 500;
  }
  & td {
    padding: 1.125rem 0.5rem;
  }
  & .actions-col {
    width: 140px;
  }
  & .description-col {
    width: 40%;
  }
  & .last-launch-col {
    white-space: nowrap;
  }
  & .name-col {
    width: 30%;
  }
  & .break-word {
    word-break: break-word;
  }
`;

export const MoreButton = styled.button.attrs(() => ({ type: 'button' }))`
  padding: 0;
  border: none;
  cursor: pointer;
  background: none;
  color: ${({ theme }) => theme.colors.fontSecondary};
  line-height: initial;

  &:hover svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;

  & > button {
    margin-right: 1rem;
  }
`;
