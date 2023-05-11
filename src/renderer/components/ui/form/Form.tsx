/* eslint-disable react/jsx-props-no-spreading */
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

type FormProps = {
  controls: yup.ObjectSchema<any>;
  onSubmit: (data: Object) => void;
  onError: (errors: Object) => void;
  children: JSX.Element;
};

const Form = ({ controls, onSubmit, onError, children }: FormProps): JSX.Element => {
  const methods = useForm<FormData>({
    resolver: yupResolver(controls, { stripUnknown: true, abortEarly: false }),
    defaultValues: controls.cast({}),
  });

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit, onError)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
