import { useNavigate, useLocation } from "react-router-dom";
import axios from "../axios/axios";
import { useAuth } from "./useAuth";

// export const useRefresh = () => {
//   const { setAuthState } = useAuth();
//   const refresh = async () => {
//     const response = await axios.get("/user/refresh", {
//       withCredentials: true,
//     });
//     const newAccessToken = response.data.accessToken;

//     setAuthState(() => {
//       return newAccessToken;
//     });
//     return newAccessToken;
//   };

//   return refresh;
// };

export const useRefresh = () => {
  const location = useLocation();
  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await axios.get("/user/refresh", {
        withCredentials: true,
      });
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
  };

  return refresh;
};
