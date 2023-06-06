/* eslint-disable react/jsx-props-no-spreading */
import {
  DeepPartialSkipArrayKey,
  DefaultValues,
  FieldError,
  FieldPath,
  FieldValues,
  FormProvider,
  useForm,
  useWatch,
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
  data?: DefaultValues<TData> | null;
  customErrors?: Array<CustomFormError<TData>>;
  onSubmit: (data: TData) => void;
  onError?: (errors: Object) => void;
  onValuesChange?: (data: DeepPartialSkipArrayKey<TData>) => void;
  children: JSX.Element;
};

const Form = <TData extends FieldValues>({
  schema,
  initialData,
  data,
  customErrors,
  onSubmit,
  onError,
  onValuesChange,
  children,
}: FormProps<TData>): JSX.Element => {
  const methods = useForm<TData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });
  const watchedForm = useWatch({ control: methods.control });

  useEffect(() => {
    onValuesChange?.(watchedForm);
  }, [watchedForm, onValuesChange]);

  useEffect(() => {
    customErrors?.forEach((e) => {
      methods.setError(e.name, e.error, { shouldFocus: e.shouldFocus });
    });
  }, [customErrors, methods]);

  useEffect(() => {
    if (data) {
      methods.reset(data);
    }
  }, [data, methods]);

  return (
    <FormProvider<TData> {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit, onError)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
