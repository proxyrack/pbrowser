/* eslint-disable react/jsx-props-no-spreading */
import { useFormContext } from 'react-hook-form';
import * as S from './styles';

type RadioButtonProps = {
  id: string;
  name: string;
  value: string;
  label?: string;
};

const RadioButton = ({ id, name, value, label = '' }: RadioButtonProps) => {
  const { register } = useFormContext();

  return (
    <S.RadioContainer>
      <S.Radio type="radio" id={id} value={value} {...register(name)} />
      <S.Label htmlFor={id}>{label}</S.Label>
    </S.RadioContainer>
  );
};

export default RadioButton;
