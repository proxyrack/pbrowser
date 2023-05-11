import styled from 'styled-components';

export const SettingsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SettingItem = styled.div`
  padding: 0.75rem 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  :not(:last-child) {
    border-bottom: 1px solid #e9e6f066;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
`;

export const Status = styled.div`
  height: 1.25rem;
  margin-right: 1rem;

  & > svg {
    color: #fff;
  }
`;

export const Circle = styled.div`
  background-color: ${({ theme }) => theme.colors.success};
  border-radius: 50%;
  height: 1.25rem;
  width: 1.25rem;
  text-align: center;

  & > svg {
    color: #fff;
  }
`;

export const Triangle = styled.div`
  & > svg {
    color: ${({theme}) => theme.colors.danger};
  }
`;
