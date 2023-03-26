import axios from "axios";
import { useEffect, useState } from "react";

export const createServices = (baseURL: string) => {
  const services = axios.create({
    baseURL,
  });
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
