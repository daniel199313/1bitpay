import { useRef, useState } from "react";
import { RuleFunc } from "./rule";
import { classX } from "../../utils/css";

interface InputProps {
  placeholder: string;
  type: string;
  name: string;
  rules?: RuleFunc[];
  front?: React.ReactNode;
  back?: React.ReactNode;
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onInput?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const verify = (value: string, rules: RuleFunc[] | undefined) => {
  if (!rules) {
    return;
  }
  for (const rule of rules) {
    const error = rule(value);
    if (error) {
      return error;
    }
  }
};

export const Input = ({
  placeholder,
  type,
  name,
  rules,
  front,
  back,
  className,
  onBlur,
  onInput,
}: InputProps) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [temp, setTemp] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  // 失去焦点时，如果有错误，清空 value 保存到 temp 中
  const handlerBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = verify(value, rules);

    onBlur && onBlur(e);

    if (error && inputRef.current) {
      // 记录 value
      setTemp(inputRef.current.value);
      // 清空 value
      inputRef.current.value = "";
    }
    setError(error);
  };
  // 获得焦点时，如果有错误，恢复 value,清除错误
  const handlerFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (temp) {
      // 恢复 value
      e.target.value = temp;
      setTemp(undefined);
    }
    setError(undefined);
  };

  return (
    <div
      className={classX(
        "border-1 border-solid rounded-2xl mb-[12px] flex overflow-hidden",
        {
          "border-gary": !error,
          "border-error placeholder:text-red-300 bg-red-100": !!error,
        },
        {
          [className || ""]: !!className,
        }
      )}
    >
      <div>{front}</div>
      <input
        name={name}
        type={type}
        ref={inputRef}
        className={classX("flex-1 py-[17px] px-[15px]", {
          "bg-white placeholder:text-secondary": !error,
          "bg-transparent  placeholder:text-error": !!error,
        })}
        placeholder={error ? error : placeholder}
        onBlur={handlerBlur}
        onFocus={handlerFocus}
        onInput={onInput}
      />
      <div>{back}</div>
    </div>
  );
};
