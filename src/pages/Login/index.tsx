import HeaderPNG from "../../static/login_header.png";
import { Form, Input } from "../../components/Form";
import { PrimaryButton } from "../../components/Buttons";
import { phone, required } from "../../components/Form/rule";
import Select from "../../components/Form/Select";
import { useEffect, useState } from "react";
import { useServices } from "../../providers/services";
import { useApp } from "../../providers/app";
import { useNavigate } from "react-router-dom";

export default () => {
  const { api } = useServices();
  const { state, setRole, setToken, setUid } = useApp();
  const navigate = useNavigate();

  // 常见的国家区号
  const [options, setOptions] = useState<{ value: string; label: string }[]>([
    { value: "+86", label: "中国" },
  ]);
  const [filter, setFilter] = useState<string>("");
  const [areaCode, setAreaCode] = useState<string>("+86");
  const handlerSelect = (value: string) => {
    setAreaCode(value);
  };

  const filterOptions = () =>
    options.filter((option) => {
      return option.label.includes(filter) || option.value.includes(filter);
    });

  // 区号选择器
  const btnAreaCode = (
    <div className="flex items-center h-full px-2">
      <Select
        value={areaCode}
        options={options}
        onChange={handlerSelect}
        render={(option) => option.value}
        optionsRender={(options, handlerSelect) => {
          return (
            <div className="">
              <div className="py-4 px-9  top-0 left-0 right-0 bg-white absolute">
                <div className="my-[23px] font-medium">选择国家或地区</div>
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

  const handlerPhoneBlur = (value: string) => {
    // 调用获取Role
    api
      .getRole({
        phoneNumber: value,
        regionCode: areaCode,
      })
      .then((res) => {
        // 设置role
        setRole(res.data.data.role);
        localStorage.setItem("baseURL", res.data.data.baseUrl);
      });
  };

  useEffect(() => {
    api.getCountryCode().then((res) => {
      const { data } = res;
      let options = data.data.map((item) => ({
        value: item.phoneCodeStr,
        label: item.zh,
      }));
      // 根据 value 去重
      options = options.filter(
        (item, index, self) =>
          self.findIndex((t) => t.value === item.value) === index
      );

      setOptions(options);
    });
    console.log(api);
  }, []);

  // 发送验证码按钮
  const btnSendCode = (
    <div className="flex items-center h-full px-2">
      <div className="text-primary">发送验证码</div>
    </div>
  );

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handlerSubmit = () => {
    // 调用登录接口
    api
      .login(
        { phoneNumber: phoneNumber, regionCode: areaCode, code },
        state.role!
      )
      .then((res) => {
        if (res.data.code === 200) {
          setToken(res.data.data["Auth-Token"]);
          setUid(res.data.data["uid"]);
          navigate("/pages/home");
        }
      });
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center">
      <div className="flex-1 text-center flex flex-col justify-end">
        <img src={HeaderPNG} alt="" />
      </div>
      <div className="flex-1 w-full p-[37px]">
        <Form>
          <Input
            name="phoneNumber"
            type="text"
            placeholder="请输入电话号码"
            rules={[required("电话号码不能为空"), phone("手机号格式不正确")]}
            front={btnAreaCode}
            onBlur={(e) => handlerPhoneBlur(e.currentTarget.value)}
            onInput={(e) => setPhoneNumber(e.currentTarget.value)}
          ></Input>
          <Input
            name="code"
            type="text"
            placeholder="请输入验证码"
            rules={[required("验证码不能为空")]}
            back={btnSendCode}
            onInput={(e) => setCode(e.currentTarget.value)}
          ></Input>
          <div className="mt-[20px]">
            <PrimaryButton onClick={handlerSubmit} className=" h-[48px]">
              Enter
            </PrimaryButton>
          </div>
        </Form>
      </div>
    </div>
  );
};
