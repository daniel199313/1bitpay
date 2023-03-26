// 使用useReducer和useContext实现全局状态管理
import { createContext, Provider, useReducer, Context } from "react";

// 定义actionsMap 是一个对象，key是action的type，value是action的处理函数
type ActionsMap<S, A> = {
  [key: string]: (state: S, action: A) => S;
};
interface IAction {
  type: string;
  payload: unknown;
}

// 定义一个函数，传入一个actionsMap，返回一个reducer函数
export function createReducer<S, A extends IAction>(
  actionsMap: ActionsMap<S, A>
) {
  return (state: S, action: A) => {
    const handler = actionsMap[action.type];
    if (handler) {
      return handler(state, action);
    } else {
      return state;
    }
  };
}
