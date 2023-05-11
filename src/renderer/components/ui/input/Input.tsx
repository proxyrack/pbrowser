/* eslint-disable react/jsx-props-no-spreading */
import { useFormContext } from 'react-hook-form';
import * as S from './styles';

type InputProps = {
  id: string;
  type: string;
  placeholder: string;
  name: string;
  fullWidth: boolean;
};

const Input = ({ id, type, placeholder, name, fullWidth }: InputProps): JSX.Element => {
  const { register } = useFormContext();

  return (
    <S.Input
      id={id}
      type={type}
      placeholder={placeholder}
      fullWidth={fullWidth}
      {...register(name)}
    />
  );
};

export default Input;
