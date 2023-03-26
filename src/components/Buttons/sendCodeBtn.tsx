import { useEffect, useState } from "react";
import { classX } from "../../utils/css";
import { useServices } from "../../providers/services";

interface IProps {
  phoneNumber: string;
  regionCode: string;
  type: string;
}
export default ({ phoneNumber, regionCode, type }: IProps) => {
  // 发送验证码 时间
  const [sendTime, setSendTime] = useState<Date | null>(null);
  // 倒计时
  const [countdown, setCountdown] = useState<number>(0);

  const { api } = useServices();

  const handlerClick = () => {
    if (countdown !== 0) return;
    setSendTime(new Date());
    api.sendSms({ phoneNumber, regionCode, type }).then((res) => {});
  };

  useEffect(() => {
    if (sendTime) {
      let timer = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - sendTime.getTime();
        const seconds = Math.floor(diff / 1000);
        if (seconds >= 60) {
          setCountdown(0);
          setSendTime(null);
          clearInterval(timer);
        } else {
          setCountdown(60 - seconds);
        }
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [sendTime]);

  return (
    <div
      onClick={handlerClick}
      className={classX({
        "text-link": countdown === 0,
        "text-gray-400": countdown !== 0,
      })}
    >
      {countdown === 0 ? "发送验证码" : `${countdown}秒后重试`}
    </div>
  );
};
