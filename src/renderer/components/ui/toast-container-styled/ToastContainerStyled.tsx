import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

type WrappedToastContainerProps = {
  className?: string;
};

const WrappedToastContainer = ({ className }: WrappedToastContainerProps) => {
  return (
    <div className={className}>
      <ToastContainer
        closeOnClick
        theme="colored"
        position="top-right"
        draggable={false}
        hideProgressBar
      />
    </div>
  );
};

const ToastContainerStyled = styled(WrappedToastContainer)`
  .Toastify__toast-container {
    /* style for default container - in docs not wrapped inside any class */
  }

  .Toastify__close-button--colored.Toastify__close-button {
    color: ${({ theme }) => theme.colors.fontSecondary};
    align-self: center;

    & svg {
      display: block;
      width: 16px;
      height: 16px;
    }
  }

  .Toastify__toast-theme--colored .Toastify__toast-body {
    color: ${({ theme }) => theme.colors.fontDark};
    font-size: 0.875rem;
    padding: 0;
    margin: 0;
  }

  .Toastify__toast-theme--colored.Toastify__toast--success {
    border: 1px solid ${({ theme }) => theme.colors.success};
    background: #e6feec;
    padding: 1rem;
  }

  .Toastify__toast-theme--colored.Toastify__toast--success .Toastify__toast-icon {
    color: ${({ theme }) => theme.colors.success};
  }

  .Toastify__toast-theme--colored.Toastify__toast--error {
    border: 1px solid ${({ theme }) => theme.colors.dangerLighter};
    background: #fee6e6;
    padding: 1rem;
  }

  .Toastify__toast-theme--colored.Toastify__toast--error .Toastify__toast-icon {
    color: ${({ theme }) => theme.colors.danger};
  }

  .Toastify__toast-theme--colored.Toastify__toast--info {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background: #eae6fe;
    padding: 1rem;
  }

  .Toastify__toast-theme--colored.Toastify__toast--info .Toastify__toast-icon {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default ToastContainerStyled;
