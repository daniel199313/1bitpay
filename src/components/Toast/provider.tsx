import { useState } from "react";
import { IState, ToastContext } from "./context";
import Toast from ".";

export default function ({
  children,
}: React.PropsWithChildren<React.ReactNode>) {
  const [state, setState] = useState<IState>({
    msg: "",
    type: "success",
  });

  const show = (msg: string, type: "success" | "fail", duration = 2000) => {
    setState({
      msg,
      type,
    });
    setTimeout(() => {
      setState({
        msg: "",
        type: "success",
      });
    }, duration);
  };

  const hide = () => {
    setState({
      msg: "",
      type: "success",
    });
  };

  return (
    <ToastContext.Provider value={{ state, show, hide }}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
}
