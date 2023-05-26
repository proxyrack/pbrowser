import { ButtonColor } from './button-colors';
import * as S from './styles';

type ButtonProps = {
  type?: 'button' | 'submit';
  color?: ButtonColor;
  fullWidth?: boolean;
  children: string | JSX.Element;
  size?: 's' | 'm';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  type = 'button',
  color = 'secondary',
  fullWidth = false,
  children,
  size = 'm',
  className,
  disabled,
  onClick,
}: ButtonProps): JSX.Element => {
  return (
    <S.Button
      type={type}
      color={color}
      fullWidth={fullWidth}
      size={size}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </S.Button>
  );
};

export default Button;
