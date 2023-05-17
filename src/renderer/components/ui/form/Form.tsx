/* eslint-disable react/jsx-props-no-spreading */
import {
  DefaultValues,
  FieldError,
  FieldPath,
  FieldValues,
  FormProvider,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

export type CustomFormError<T extends FieldValues> = {
  name: FieldPath<T>;
  error: FieldError;
  shouldFocus: boolean;
};

type FormProps<TData extends FieldValues> = {
  schema: z.ZodObject<any>;
  initialData: DefaultValues<TData>;
  customErrors?: Array<CustomFormError<TData>>;
  onSubmit: (data: TData) => void;
  onError?: (errors: Object) => void;
  onBlur?: (data: TData) => void;
  children: JSX.Element;
};

const Form = <TData extends FieldValues>({
  schema,
  initialData,
  customErrors,
  onSubmit,
  onError,
  onBlur,
  children,
}: FormProps<TData>): JSX.Element => {
  const methods = useForm<TData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const handleBlur = () => {
    onBlur?.(methods.getValues());
  };

  useEffect(() => {
    customErrors?.forEach((e) => {
      methods.setError(e.name, e.error, { shouldFocus: e.shouldFocus });
    });
  }, [customErrors, methods]);

  return (
    <FormProvider<TData> {...methods}>
      <form
        noValidate
        onSubmit={methods.handleSubmit(onSubmit, onError)}
        onBlur={handleBlur}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
