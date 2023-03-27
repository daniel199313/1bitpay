import { useEffect, useRef, useState } from "react";
import { classX } from "../../utils/css";
import Action from "../Action";
// 下拉选择组件
interface IOption {
  value: string;
  label: string;
}
interface IProps {
  options: IOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  render?: (option: IOption) => React.ReactNode;
  optionsRender?: (
    options: IOption[],
    handlerSelect: (option?: IOption) => void
  ) => React.ReactNode;
}

export default (props: IProps) => {
  const {
    options,
    value,
    onChange,
    placeholder,
    className,
    render,
    optionsRender,
  } = props;
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selected, setSelected] = useState<IOption | null>(null);
  // 如果有自定义 render，使用自定义 render
  const _render = render || ((option: IOption) => option.label);
  const _optionsRender =
    optionsRender ||
    ((options: IOption[], handlerSelect: (option?: IOption) => void) => {
      return options.map((option, index) => (
        <div
          className={classX("py-8", {
            "font-bold text-blue-600": option.value === value,
            "border-b-1 border-b-background": index !== options.length - 1,
          })}
          key={option.value}
          onClick={() => handlerSelect(option)}
        >
          {option.label}
        </div>
      ));
    });

  // 选中某个选项
  useEffect(() => {
    options.find((option) => {
      if (option.value === value) {
        setSelected(option);
        return true;
      }
      return false;
    });
  }, [value]);

  const handlerClick = () => {
    setShowOptions(true);
  };

  const handlerSelect = (option?: IOption) => {
    setShowOptions(false);
    if (!option) {
      return;
    }
    onChange(option.value);
  };

  const handlerClose = () => {
    return false;
  };

  return (
    <div className={classX(className)}>
      <div onClick={handlerClick} className="flex items-center">
        <div className="px-1">{selected ? _render(selected) : placeholder}</div>
        <i className="iconfont icon-toBottom-fill"></i>
      </div>
      <Action show={showOptions} onClose={handlerClose}>
        <div className={classX("max-h-[75vh] overflow-y-scroll")}>
          {_optionsRender(options, handlerSelect)}
        </div>
      </Action>
    </div>
  );
};
