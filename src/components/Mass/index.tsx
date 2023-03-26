import { useEffect, useState } from "react";
import { classX } from "../../utils/css";

interface IProps {
  background?: string;
  children?: React.ReactNode;
  show?: boolean;
  onClose?: () => boolean;
}
export default ({ children, background, show, onClose }: IProps) => {
  const [_show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (show) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [show]);

  const handlerClick = () => {
    if (onClose) {
      const result = onClose();
      if (result) {
        setShow(false);
      }
      return;
    }
  };

  return (
    <div
      onClick={handlerClick}
      className={classX(
        "fixed w-screen h-screen z-[999] top-0 left-0",
        {
          hidden: !_show,
          "bg-[#0003]": !background,
        },
        background ? `bg-${background}` : ""
      )}
    >
      {children}
    </div>
  );
};
