import styled from 'styled-components';
import { Card } from 'renderer/styles/sharedStyles';

export { Card };

export const Divider = styled.hr`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.secondary};
  border-style: solid;
  margin: 1.5rem -1rem;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 24px 1fr;
  width: 100%;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: end;

  & > button {
    margin-right: 0.625rem;
  }

  & > button:last-child {
    margin-right: 0;
  }
`;

export const Spacer = styled.div`
  width: 100%;
  height: 0;
  margin-top: 1rem;
`;
