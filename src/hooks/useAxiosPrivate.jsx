import { useAuth } from "./useAuth";
import { axiosPrivate } from "../axios/axios";
import { useRefresh } from "./useRefresh";

import { useEffect } from "react";

export const useAxiosPrivate = () => {
  const { authState } = useAuth();
  const refresh = useRefresh();

  useEffect(() => {
    console.log("interceptors fired");
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authState}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
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
