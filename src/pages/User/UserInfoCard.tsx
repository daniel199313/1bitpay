import Card from "../../components/Card";
import { useApp } from "../../providers/app";
import { shortText } from "../../utils/text";

export default () => {
  const { state } = useApp();
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="bg-background w-[36px] h-[36px] rounded-[13px] flex items-center justify-center">
          <i className="iconfont icon-Profile"></i>
        </div>
        <div className="flex-1 px-4">
          <div>{state.userInfo?.nickName}</div>
          <div className=" text-secondary text-xs max-w-[10rem] text-ellipsis overflow-hidden">
            {shortText(state.userInfo?.mobile || "", 3, 3, "****")}
          </div>
        </div>
      </div>
    </Card>
  );
};
