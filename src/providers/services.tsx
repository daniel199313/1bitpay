import axios, { AxiosInstance } from "axios";
import {
  createContext,
  ReactNode,
  useReducer,
  PropsWithChildren,
  useContext,
} from "react";
import { baseServices, createServices } from "../services/base";
import { createReducer } from "../utils/store";
import { createAPI, IAPI } from "../services/api";

interface IState {
  services: AxiosInstance;
  api: IAPI;
}
enum ActionType {
  setServices = "setServices",
}
interface IAction {
  type: ActionType;
  payload: unknown;
}
interface IActions {
  setServices: (services: AxiosInstance) => void;
  setServicesByBaseURL: (baseURL: string) => void;
}
const defaultState: IState = {
  services: baseServices,
  api: createAPI(baseServices),
} as IState;
const context = createContext<IState & IActions>({} as IState & IActions);

export default ({ children }: PropsWithChildren<ReactNode>) => {
  // setIsLoading(true);
  const [state, dispatch] = useReducer(
    createReducer<IState, IAction>({
      setServices: (state, action) => {
        const services = action.payload as AxiosInstance;

        return {
          ...state,
          services: services,
          api: createAPI(services),
        };
      },
    }),
    defaultState
  );

  const actions: IActions = {
    setServices: (services: AxiosInstance) => {
      dispatch({ type: ActionType.setServices, payload: services });
    },
    setServicesByBaseURL: (baseURL: string) => {
      if (!baseURL) {
        return;
      }
      localStorage.setItem("baseURL", baseURL);
      const services = createServices(baseURL);
      dispatch({ type: ActionType.setServices, payload: services });
    },
  };

  return (
    <context.Provider value={{ ...state, ...actions }}>
      {children}
    </context.Provider>
  );
};

export const useServices = () => {
  return useContext(context);
};
