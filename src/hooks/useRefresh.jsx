import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useCallback } from "react";
import { axiosPrivate } from "../axios/axios";

export const useRefresh = () => {
  const location = useLocation();
  const { setAuthState } = useAuth();
  const navigate = useNavigate();
  const refresh = useCallback(async () => {
    try {
      const response = await axiosPrivate.get("/user/refresh");
      const newAccessToken = response.data.accessToken;

      setAuthState(() => {
        return newAccessToken;
      });
      return newAccessToken;
    } catch (error) {
      setAuthState(() => {
        return "";
      });

      navigate("/login", {
        state: { location: location.pathname },
        replace: true,
      });
      console.error(error.response.data);
    }
  }, []);

  return refresh;
};
