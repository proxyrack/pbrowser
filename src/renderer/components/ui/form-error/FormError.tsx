import { useFormContext } from 'react-hook-form';
import * as S from './styles';

type FormErrorProps = {
  name: string;
};

const FormError = ({ name }: FormErrorProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <S.ErrorContainer>
      {Object.keys(errors).length > 0 && <span>{errors[name]?.message?.toString()}</span>}
    </S.ErrorContainer>
  );
};

export default FormError;
