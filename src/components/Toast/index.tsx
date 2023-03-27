import Icon, { IconType } from "../Icon";
import { useToast } from "./context";
export default function () {
  const { state } = useToast();
  const { msg, type } = state;
  if (!msg) return null;
  return (
    <div className="fixed w-screen h-screen z-[999] flex items-center justify-center">
      <div className="p-4 min-w-[100px] min-h-[100px] bg-[rgba(0,0,0,0.5)] text-white text-center] rounded-xl flex flex-col justify-center items-center">
        <Icon
          type={type === "success" ? IconType.success : IconType.fail}
          className="text-[48px]"
        />
        <div>{msg}</div>
      </div>
    </div>
  );
}
