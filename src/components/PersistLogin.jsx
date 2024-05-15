import { Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useRefresh } from "../hooks/useRefresh";
import { useEffect, useState } from "react";
import { Loader } from "./loader/Loader";

export const PersistLogin = () => {
  const { authState, persist } = useAuth();
  const refresh = useRefresh();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyRefresh = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    persist && !authState ? verifyRefresh() : setLoading(false);
  }, []);

  return <>{!persist ? <Outlet /> : loading ? <Loader /> : <Outlet />}</>;
};
