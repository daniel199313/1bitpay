import axios from "axios";
import { useEffect, useState } from "react";

export const createServices = (baseURL: string) => {
  const services = axios.create({
    baseURL,
  });
  services.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Auth-Token"] = `${token}`;
      // content-type json
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });
  // 拦截resopnse
  services.interceptors.response.use(
    (response) => {
      console.log("response", response);
      // 未登录
      if (response.data.code === 2001) {
        // localStorage.removeItem("token");
        // localStorage.removeItem("role");
        // localStorage.removeItem("baseURL");
        // localStorage.removeItem("app_state");
        // window.location.href = "/#/login";
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return services;
};

export const baseServices = createServices(
  localStorage.getItem("baseURL") || "https://tad.1bitpay.tech"
);

export function useDateFetch<P, T>(
  url: string,
  params: P,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
): [T | null] {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    baseServices
      .request<T>({
        url,
        method,
        params,
      })
      .then((res) => {
        setData(res.data);
      });
  }, [url, params, method]);
  return [data];
}
