import { useFormContext } from 'react-hook-form';

type FormErrorProps = {
  name: string;
};

const FormError = ({ name }: FormErrorProps) => {
  const {
    formState: { errors },
  } = useFormContext();
  const getError = () => {
    if (Object.keys(errors).length === 0) return <p>no errors</p>;

    return <p>{errors[name]?.message}</p>;
  };

  return <div>{getError()}</div>;
};

export default FormError;
