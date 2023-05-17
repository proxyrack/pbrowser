import styled from 'styled-components';
import { BaseModalBackground } from 'styled-react-modal';

export const FadingBackground = styled(BaseModalBackground)<{ opacity: number }>`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

export const ModalDialog = styled.div<{ opacity: number }>`
  width: 408px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 0px 16px rgba(69, 74, 79, 0.16);
  border-radius: 8px;
  opacity: ${(props) => props.opacity};
`;

export const Title = styled.div`
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: none;
  padding: 0;
  color: ${({ theme }) => theme.colors.fontSecondary};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.fontDark};
  }
`;

export const Heading = styled.h1`
  font-size: 1rem;
  font-weight: 500;
`;

export const Actions = styled.div`
  display: flex;
  & button:not(:last-child) {
    margin-right: 1.5rem;
  }
`;

export const Content = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  font-size: 0.875rem;
  display: flex;
`;

export const Icon = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  & svg {
    fill: ${({ theme }) => theme.colors.dangerLighter};
    color: #fff;
  }

  & svg path {
    color: ${({ theme }) => theme.colors.dangerLighter};
  }
`;

export const Message = styled.div``;
