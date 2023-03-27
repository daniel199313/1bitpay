import { FormEventHandler, useState } from "react";

interface FormProps {
  children: React.ReactNode;
  ref?: React.RefObject<HTMLFormElement>;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Form = ({ children, ref, onSubmit }: FormProps) => {
  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit && onSubmit(e);
    return false;
  };

  return (
    <form ref={ref} onSubmit={handlerSubmit}>
      {children}
    </form>
  );
};

interface FormState<T> {
  fields: T;
  errors: { [key in keyof T]?: string };
  onInput: (e: React.FormEvent<HTMLInputElement>) => void;
  onError: (evt: { name: string; error?: string }) => void;
  hasError: boolean;
}

export function useFormState<T>(): FormState<T> {
  const [fields, setFields] = useState<T>({} as T);
  const [errors, setErrors] = useState<{ [key in keyof T]?: string }>({});

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFields((fields) => ({ ...fields, [name]: value }));
  };

  const onError = ({ name, error }: { name: string; error?: string }) => {
    const _name = name as keyof T;
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (error) {
        newErrors[_name] = error;
      } else {
        delete newErrors[_name];
      }
      return newErrors;
    });
  };

  const hasError = Object.keys(errors).length > 0;

  return {
    fields,
    errors,
    onInput,
    onError,
    hasError,
  };
}
