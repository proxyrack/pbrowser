import styled, { css } from 'styled-components';
import { BaseModalBackground } from 'styled-react-modal';
import { ModalSize } from './modal-size';

const modalWidth = {
  sm: '408px',
  md: '530px',
  lg: '766px',
};

export const FadingBackground = styled(BaseModalBackground)<{ opacity: number }>`
  background-color: rgba(147, 182, 234, 0.16);
  backdrop-filter: blur(2px);
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

export const ModalDialog = styled.div<{ opacity: number; size: ModalSize }>`
  width: ${({ size }) => modalWidth[size]};
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
  transition-property: ${({ theme }) => theme.transitions.defaultProperty};
  transition-duration: ${({ theme }) => theme.transitions.defaultDuration};
  transition-timing-function: ${({ theme }) => theme.transitions.defaultFunction};

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
  justify-content: center;
  & button:not(:last-child) {
    margin-right: 1.5rem;
  }
`;

const scrollCss = css`
  max-height: calc(100vh - 10rem);
  overflow-y: auto;
`;

export const Content = styled.div<{ contentScrollbar: boolean }>`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  font-size: 0.875rem;
  ${({ contentScrollbar }) => contentScrollbar && scrollCss}
`;
