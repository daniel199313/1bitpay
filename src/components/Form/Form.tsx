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
