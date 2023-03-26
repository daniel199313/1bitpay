import {
  useReducer,
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
} from "react";

interface IAppContext {
  title: string;
  token?: string;
  role?: RoleType;
  uid?: string;
  userInfo?: IUserInfo;
}

type ActionType =
  | "setTitle"
  | "setToken"
  | "setRole"
  | "setUid"
  | "setUserInfo";
declare interface IAction<P = any> {
  type: ActionType;
  payload: P;
}
const state_save = localStorage.getItem("app_state");
const defaultState: IAppContext = state_save ? JSON.parse(state_save) : {};
export const context = createContext<IAppContextAction>(
  {} as IAppContextAction
);

export interface IAppContextAction {
  state: IAppContext;
  setTitle: (title: string) => void;
  setToken: (token: string) => void;
  setRole: (role: RoleType) => void;
  setUid: (uid: string) => void;
  setUserInfo: (userInfo: IUserInfo) => void;
}

function createAppContext() {
  const reducer = (state: IAppContext, action: IAction) => {
    switch (action.type) {
      case "setTitle":
        state = { ...state, title: action.payload };
        break;
      case "setToken":
        state = { ...state, token: action.payload };
        break;
      case "setRole":
        state = { ...state, role: action.payload as RoleType };
        break;
      case "setUid":
        state = { ...state, uid: action.payload };
        break;
      case "setUserInfo":
        state = { ...state, userInfo: action.payload as IUserInfo };
        break;
    }
    localStorage.setItem("app_state", JSON.stringify(state));
    return state;
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  // 设置标题
  const setTitle = (title: string) => {
    dispatch({ type: "setTitle", payload: title });
  };
  // 设置token
  const setToken = (token: string) => {
    localStorage.setItem("token", token);
    dispatch({ type: "setToken", payload: token });
  };
  // 设置角色
  const setRole = (role: RoleType) => {
    dispatch({ type: "setRole", payload: role });
  };
  // 设置uid
  const setUid = (uid: string) => {
    dispatch({ type: "setUid", payload: uid });
  };
  // 设置用户信息
  const setUserInfo = (userInfo: IUserInfo) => {
    dispatch({ type: "setUserInfo", payload: userInfo });
  };

  const initContext = {
    state,
    setTitle,
    setToken,
    setRole,
    setUid,
    setUserInfo,
  };

  return {
    initContext,
  };
}

export const useApp = () => {
  return useContext(context);
};

export default ({ children }: PropsWithChildren<ReactNode>) => {
  const { initContext } = createAppContext();
  return <context.Provider value={initContext}>{children}</context.Provider>;
};
