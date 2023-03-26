// 从下方弹出的操作区域
import Mass from "../Mass";

interface IProps {
  children?: React.ReactNode;
  show?: boolean;
  onClose?: () => boolean;
}

export default ({ children, show, onClose }: IProps) => {
  return (
    <Mass show={show} onClose={onClose}>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-[20px]">
        <div className="text-center">{children}</div>
      </div>
    </Mass>
  );
};
