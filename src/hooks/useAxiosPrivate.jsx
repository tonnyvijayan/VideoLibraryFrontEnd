import { useAuth } from "./useAuth";
import { axiosPrivate } from "../axios/axios";
import { useRefresh } from "./useRefresh";

import { useEffect } from "react";

export const useAxiosPrivate = () => {
  const { authState } = useAuth();
  const refresh = useRefresh();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log("from config");
        if (!config.headers["Authorization"]) {
          console.log("from config auth missin");

          config.headers["Authorization"] = `Bearer ${authState}`;
          console.log("old token", authState);
        }
        return config;
      },
      (error) => {
        console.log("from request error", error);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("response error", error);
        const previousRequest = error?.config;
        console.log("before setting header", previousRequest);
        if (error?.response?.status === 403 && !previousRequest?.sent) {
          previousRequest.sent = true;
          let newAccessToken = await refresh();
          previousRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          console.log("after setting header", previousRequest);

          return axiosPrivate(previousRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [authState, refresh]);

  return axiosPrivate;
};
