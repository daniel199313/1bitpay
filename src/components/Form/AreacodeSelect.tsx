import { useEffect, useState } from "react";
import Select from "./Select";
import { useCallback } from "react";
import Icon, { IconType } from "../Icon";

interface IProps {
  value: string;
  onSelect: (value: string) => void;
  request?: () => Promise<{ value: string; label: string }[]>;
}

export default ({ value, onSelect, request }: IProps) => {
  // 常见的国家区号
  const [options, setOptions] = useState<{ value: string; label: string }[]>([
    { value: "+86", label: "中国" },
  ]);

  useEffect(() => {
    if (request) {
      request().then((res) => {
        setOptions(res);
      });
    }
  }, [request]);

  const [filter, setFilter] = useState<string>("");

  const filterOptions = useCallback(() => {
    return options.filter((option) => {
      return option.label.includes(filter) || option.value.includes(filter);
    });
  }, [options, filter]);

  return (
    <div className="flex items-center h-full px-2">
      <Select
        value={value}
        options={options}
        onChange={onSelect}
        render={(option) => option.value}
        optionsRender={(options, handlerSelect) => {
          return (
            <div className="">
              <div className="py-4 px-9  top-0 left-0 right-0 bg-white absolute">
                <div className="flex justify-between items-center">
                  <div></div>
                  <div className="my-[23px] font-medium">选择国家或地区</div>
                  <div onClick={() => handlerSelect()}>
                    <Icon type={IconType.close} className={"text-[26px]"} />
                  </div>
                </div>
                <div className="border-solid border-1 border-background rounded-full p-4 w-full">
                  <input
                    type="text"
                    placeholder="搜索"
                    className="flex-1 text-center"
                    onChange={(e) => {
                      e.stopPropagation();
                      // 设置过滤
                      setFilter(e.currentTarget.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-scroll mt-[80px]">
                {filterOptions().map((option) => {
                  return (
                    <div
                      key={option.value}
                      className="py-4 flex px-4 justify-between"
                      onClick={() => handlerSelect(option)}
                    >
                      <div>{option.label}</div>
                      <div>{option.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};
