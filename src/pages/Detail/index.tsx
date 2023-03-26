import FissionCard from "../../components/Card/FissionCard";
import { shortText } from "../../utils/text";
import { useLocation } from "react-router-dom";

interface ISubProps {
  state: IOrderPending;
}

const statusMap: { [key: string]: string } = {
  "-3": "提币失败",
  "-2": "调用失败",
  "-1": "已拒绝",
  "0": "等待签名",
  "1": "等待确认",
  "2": "处理中",
  "3": "已完成",
};

const main = ({ state }: ISubProps) => {
  return (
    <div className="h-[150px] flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="text-[13px] font-medium">转出USDT</div>
        <div className="text-[24px] font-medium mt-[20px]">
          {state.amount.toLocaleString()}
        </div>
      </div>
    </div>
  );
};
const detail = ({ state }: ISubProps) => {
  return (
    <div className=" text-secondary font-[300]">
      <div className="flex justify-between mb-4">
        <div>发送方:</div>
        <div>{shortText(state.fromAddress)}</div>
      </div>
      <div className="flex justify-between mb-4">
        <div>接收方:</div>
        <div>{shortText(state.toAddress)}</div>
      </div>
      <div className="flex justify-between mb-4">
        <div>矿工费:</div>
        <div>{state.orderNo}</div>
      </div>
      <div className="flex justify-between mb-4">
        <div>状态:</div>
        <div className="text-error">{statusMap[state.orderStatus]}</div>
      </div>
    </div>
  );
};

const footer = ({ state }: ISubProps) => {
  return (
    <div className="flex justify-between">
      {state.orderStatus === 0 && (
        <div className=" bg-primary w-full px-[20px] py-[15px] text-center">
          签名
        </div>
      )}
      {state.orderStatus > 0 && state.orderStatus < 4 && (
        <div className=" text-secondary bg-white border-t-background border-solid border-t-1 w-full px-[20px] py-[15px] text-center">
          {statusMap[state.orderStatus]}
        </div>
      )}
      {state.orderStatus < 0 && (
        <div className=" text-secondary bg-error border-t-error border-solid border-t-1 w-full px-[20px] py-[15px] text-center">
          {statusMap[state.orderStatus]}
        </div>
      )}
    </div>
  );
};

export default () => {
  const { state } = useLocation();

  return (
    <div>
      <FissionCard
        main={main({ state })}
        detail={detail({ state })}
        footer={footer({ state })}
      />
    </div>
  );
};
