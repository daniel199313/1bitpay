import { PropsWithChildren, ReactNode } from "react";
import { mergeClass } from "../../utils/css";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PrimaryButtonClass =
  "border-primary border-solid border-[1px] rounded-lg bg-primary min-h-[40px] w-full";
const DangerButtonClass =
  "border-error border-solid border-[1px] rounded-lg bg-white text-error min-h-[40px] w-full";
const SecondaryButtonClass =
  "border-tab-default border-solid border-[1px] rounded-lg bg-tab-default  min-h-[40px] w-full";

const ButtonFactory = (typeClass: string) => {
  return ({ children, className, onClick }: ButtonProps) => (
    <button onClick={onClick} className={mergeClass(typeClass, className)}>
      {children}
    </button>
  );
};

export const PrimaryButton = ButtonFactory(PrimaryButtonClass);
export const DangerButton = ButtonFactory(DangerButtonClass);
export const SecondaryButton = ButtonFactory(SecondaryButtonClass);
