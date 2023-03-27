import { useEffect, useState } from "react";
import { classX } from "../../utils/css";
import Action from "../Action";
import Icon, { IconType } from "../Icon";

interface IProps {
  show: boolean;
  title: string;
  len: number;
  onConfirm?: (value: string) => void;
  onCancel?: () => void;
}
export default ({ show, title, len, onConfirm, onCancel }: IProps) => {
  const [inputs, setInputs] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const i = input.split("");
    for (let index = 0; index < len; index++) {
      if (!i[index]) {
        i[index] = "";
      }
    }

    i.length = len;

    setInputs(i);
    if (input.length >= len) {
      if (onConfirm) {
        onConfirm(input);
      }
    }
  }, [input]);

  useEffect(() => {
    setInputs(new Array(len).fill(""));
  }, []);

  const btns = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [".", 0, "<-"],
  ];

  const handlerInput = (value: string) => {
    if (value === "<-") {
      setInput((pre) => pre.slice(0, pre.length - 1));
      return;
    }
    if (value === ".") {
      if (input.includes(".")) {
        return;
      }
    }
    if (input.length >= len) {
      return;
    }

    setInput((pre) => pre + value);
  };

  return (
    <div>
      <Action show={show}>
        <div className="text-secondary text-center font-medium flex justify-between items-center">
          <div></div>
          <div>{title}</div>
          <div onClick={onCancel}>
            <Icon type={IconType.close} className="text-secondary" />
          </div>
        </div>
        <div className="py-6 px-4 flex items-center justify-center">
          <div className="rounded-lg border-background border-solid border-1 flex justify-center items-center">
            {inputs.map((item, index) => {
              return (
                <div
                  className={classX(
                    "w-[48px] h-[48px] flex justify-center items-center",
                    {
                      "border-r-1 border-solid border-background":
                        index !== inputs.length - 1,
                    }
                  )}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <div className=" text-secondary p-4">
          {btns.map((item, index) => {
            return (
              <div className="flex justify-around">
                {item.map((subItem) => {
                  return (
                    <div
                      onClick={() => handlerInput(subItem as string)}
                      className="rounded-md w-[58px] h-[58px] flex items-center justify-center active:bg-[rgba(0,0,0,0.5)] active:text-white"
                    >
                      {subItem}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Action>
    </div>
  );
};
