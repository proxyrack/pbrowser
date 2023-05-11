/* eslint-disable react/jsx-props-no-spreading */
import { useFormContext } from 'react-hook-form';
import * as S from './styles';

type TextareaProps = {
  id: string;
  placeholder: string;
  name: string;
};

const Textarea = ({ id, name, placeholder }: TextareaProps) => {
  const { register } = useFormContext();

  return <S.Textarea id={id} placeholder={placeholder} {...register(name)} />;
};

export default Textarea;
