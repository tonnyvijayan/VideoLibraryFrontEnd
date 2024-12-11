import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PrivateRoute = () => {
  const { authState } = useAuth();
  const location = useLocation();

  return authState ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace="true"
      state={{ location: location.pathname }}
    />
  );
};
