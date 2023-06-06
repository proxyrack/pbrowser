import styled from 'styled-components';

export const AlertContainer = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.primaryLighter}1A;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  display: flex;
`;

export const ContentContainer = styled.div`
  width: 100%;
  margin-left: 0.5rem;
  line-height: 1.5rem;
  font-size: 0.875rem;
`;

export const CollapseButtonContainer = styled.div`
  text-align: right;
`;

export const ToggleButton = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  text-decoration: underline;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  padding: 2px;

  & svg {
    fill: ${({ theme }) => theme.colors.primary};
  }

  & svg line {
    color: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }

  & svg circle {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
