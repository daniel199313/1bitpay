import { PrimaryButton } from "../../components/Buttons";
import Card from "../../components/Card";
import { Form, Input } from "../../components/Form";

import SendCodeBtn from "../../components/Buttons/sendCodeBtn";
import { useState } from "react";
import { useApp } from "../../providers/app";
import { useServices } from "../../providers/services";

export default () => {
  const { api } = useServices();
  // 验证码
  const [code, setCode] = useState("");
  // 密码
  const [password, setPassword] = useState("");
  // 确认密码
  const [confirmPassword, setConfirmPassword] = useState("");
  const { state } = useApp();

  const handleSubmit = () => {
    if (!state.role) {
      return;
    }
    api.updateWithdrawPassword(
      {
        code: code,
        withdrawPassword: password,
      },
      state.role
    );
  };

  return (
    <div>
      <Card>
        <Form>
          <div className="mb-2">
            <div className="mb-2">设置资金密码</div>
            <Input
              onInput={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="password"
              placeholder="输入钱包密码"
            />
          </div>
          <div className="mb-2">
            <div className="mb-2">重复资金密码</div>
            <Input
              onInput={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type="password"
              name="password"
              placeholder="输入钱包密码"
            />
          </div>
          <div className="mb-2">
            <div className="mb-2">手机验证码</div>
            <Input
              type="password"
              name="password"
              placeholder="请输入验证码"
              onInput={(e) => {
                setCode(e.target.value);
              }}
              back={
                <div className="h-full p-4 flex items-center justify-center">
                  {state.userInfo && (
                    <SendCodeBtn
                      phoneNumber={state.userInfo.mobile}
                      regionCode={state.userInfo.areaCode}
                      type={"1"}
                    />
                  )}
                </div>
              }
            />
          </div>
          <PrimaryButton onClick={handleSubmit} className="mt-8">
            确认修改
          </PrimaryButton>
        </Form>

        <div className="text-secondary my-8">
          <div>重要提示:</div>
          <div>1. 资金密码用于您资产转移时验证使用;</div>
          <div>2.资金密码应为 6~30 位的数宇、字母或符号，字母 区分大小写</div>
        </div>
      </Card>
    </div>
  );
};
