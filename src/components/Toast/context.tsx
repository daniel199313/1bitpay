import { createContext, useContext } from "react";

export interface IState {
  msg: string;
  type: "success" | "fail";
}
export interface IContext {
  state: IState;
  show: (msg: string, type: "success" | "fail", duration?: number) => void;
  hide: () => void;
}

const defaultContext: IContext = {
  state: {
    msg: "",
    type: "success",
  },
  show: () => {},
  hide: () => {},
};

export const ToastContext = createContext(defaultContext);

export function useToast() {
  return useContext(ToastContext);
}
