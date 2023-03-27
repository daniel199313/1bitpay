import HeaderPNG from "../../static/login_header.png";
import { Form, Input } from "../../components/Form";
import { PrimaryButton } from "../../components/Buttons";
import { phone, required } from "../../components/Form/rule";
import AreacodeSelect from "../../components/Form/AreacodeSelect";
import { useCallback, useEffect, useState } from "react";
import { useServices } from "../../providers/services";
import { useApp } from "../../providers/app";
import { useNavigate } from "react-router-dom";
import { useFormState } from "../../components/Form/Form";
import { useToast } from "../../components/Toast/context";

export default () => {
  const { api } = useServices();
  const { state, setRole, setToken, setUid } = useApp();
  const navigate = useNavigate();
  const { show } = useToast();

  const [areaCode, setAreaCode] = useState<string>("+86");
  const { fields, errors, onInput, onError, hasError } = useFormState<{
    phoneNumber: string;
    code: string;
  }>();

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

  const requestAreaCode = useCallback(() => {
    return api.getCountryCode().then((res) => {
      if (res.data.data.length > 0) {
        return res.data.data.map((item) => {
          return {
            label: item["zh"],
            value: item["phoneCodeStr"],
          };
        });
      }
      return [{ label: "中国", value: "+86" }];
    });
  }, []);

  const handlerSubmit = () => {
    if (hasError) return show("请检查输入是否正确", "fail");
    // 调用登录接口
    api
      .login(
        {
          phoneNumber: fields["phoneNumber"],
          regionCode: areaCode,
          code: fields["code"],
        },
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
            front={
              <AreacodeSelect
                value={areaCode}
                onSelect={setAreaCode}
                request={requestAreaCode}
              />
            }
            onBlur={(e) => handlerPhoneBlur(e.currentTarget.value)}
            onInput={onInput}
            onError={onError}
          ></Input>
          <Input
            name="code"
            type="text"
            placeholder="请输入验证码"
            rules={[required("验证码不能为空")]}
            onInput={onInput}
            onError={onError}
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
