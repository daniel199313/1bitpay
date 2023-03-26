// 这段代码逻辑已经更改，应该移出此目录

import { useMemo } from "react";
import { createServices } from "../services/base";
import { createAPI, IAPI } from "../services/api";
import { useLoading } from "../components/Loading/context";

export const useServices = () => {
  const { setIsLoading } = useLoading();
  const baseURL = localStorage.getItem("baseURL") || "https://tad.1bitpay.tech";

  const services = useMemo(() => createServices(baseURL), [baseURL]);
  const api = useMemo(() => createAPI(services), [services]);

  const requestInterceptor = (config: any) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Auth-Token"] = `${token}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  };

  const responseInterceptor = (response: any) => {
    console.log("response", response);
    // 未登录
    if (response.data.code === 2001) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("baseURL");
      localStorage.removeItem("app_state");
      window.location.href = "/#/login";
    }
    setIsLoading(false);
    return response;
  };

  services.interceptors.request.use(requestInterceptor);
  services.interceptors.response.use(responseInterceptor, (error) => {
    setIsLoading(false);
    return Promise.reject(error);
  });

  return { services, api };
};
