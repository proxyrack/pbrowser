import { ButtonColor } from './button-colors';
import * as S from './styles';

type ButtonProps = {
  type?: 'button' | 'submit';
  color?: ButtonColor;
  fullWidth?: boolean;
  children: string | JSX.Element;
  size?: 's' | 'm';
  onClick?: () => void;
};

const Button = ({
  type = 'button',
  color = 'secondary',
  fullWidth = false,
  children,
  size = 'm',
  onClick,
}: ButtonProps): JSX.Element => {
  return (
    <S.Button
      type={type}
      color={color}
      fullWidth={fullWidth}
      size={size}
      onClick={onClick}
    >
      {children}
    </S.Button>
  );
};

export default Button;
