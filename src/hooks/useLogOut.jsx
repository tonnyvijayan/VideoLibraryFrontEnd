import { useAxiosPrivate } from "./useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useToast } from "./useToast";

export const useLogOut = () => {
  const navigate = useNavigate();
  const { setAuthState } = useAuth();
  const showToast = useToast();

  const axiosPrivate = useAxiosPrivate();
  const logOut = async () => {
    try {
      await axiosPrivate.get("/user/logout");
      setAuthState("");
      navigate("/");
      showToast("Logged Out", "success");
    } catch (error) {
      console.error(error);
    }
  };

  return logOut;
};
