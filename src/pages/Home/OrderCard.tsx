import Card from "../../components/Card";
import { PrimaryButton, DangerButton } from "../../components/Buttons";
import { shortText } from "../../utils/text";
import { formatDate } from "../../utils/date";
import { Link } from "react-router-dom";
import { useServices } from "../../providers/services";
import { useApp } from "../../providers/app";
import { useToast } from "../../components/Toast/context";
import SafeInput from "../../components/Form/SafeInput";
import { useState } from "react";

interface IProps {
  data: IOrderPending;
  onSubmit?: () => void;
}

export default ({ data, onSubmit }: IProps) => {
  const { api } = useServices();
  const { state } = useApp();
  const { show } = useToast();
  const [showSafeInput, setShowSafeInput] = useState<boolean>(false);
  const [_status, setStatus] = useState<number>(0);

  const handlerSubmit = (status: number) => {
    if (state.role === undefined) {
      return;
    }
    setStatus(status);
    setShowSafeInput(true);
  };
  const handlerConfirm = (password: string) => {
    api
      .confirmWithdraw({ id: data.id, password, status: _status })
      .then((res) => {
        onSubmit && onSubmit();
        if (res.data.code === 200) {
          show("操作成功", "success");
        } else {
          show(res.data.msg, "fail");
        }
      })
      .finally(() => {
        setShowSafeInput(false);
      });
  };
  return (
    <Card>
      <Link to={"/transaction/" + data.id} state={data}>
        <div className="flex justify-between text-secondary text-[13px] font-medium">
          <div>转出USDT</div>
          <div>
            {
              // 创建时间
              formatDate(new Date(data.createTime), "yyyy-MM-dd HH:mm:ss")
            }
          </div>
        </div>
        <div className="text-2xl py-[18px]">{data.amount}</div>
        <div className="flex justify-between text-secondary text-[13px] font-medium py-1">
          <div>链：</div>
          <div>{data.chain}</div>
        </div>
        <div className="flex justify-between text-secondary text-[13px] font-medium">
          <div>地址：</div>
          <div className="max-w-[10rem] overflow-hidden">
            {shortText(data.toAddress)}
          </div>
        </div>
      </Link>

      <div className="flex justify-between mt-[20px]">
        <div className="flex-1">
          <DangerButton onClick={(e) => handlerSubmit(0)}>拒绝</DangerButton>
        </div>
        <div className="w-[12px]"></div>
        <div className="flex-1">
          <PrimaryButton onClick={(e) => handlerSubmit(1)}>
            确认转出
          </PrimaryButton>
        </div>
      </div>
      <SafeInput
        show={showSafeInput}
        title={"请输入资金密码"}
        len={6}
        onCancel={() => setShowSafeInput(false)}
        onConfirm={handlerConfirm}
      ></SafeInput>
    </Card>
  );
};
