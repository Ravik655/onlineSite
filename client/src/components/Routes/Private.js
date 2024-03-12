import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const PrivateRoute = () => {
  const { auth } = useAuth();
  const [ok, setOk] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/user-auth");
        if (isMounted) {
          if (res.data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        }
      } catch (error) {
        console.error("Error in authCheck:", error);
      }
    };
    const shouldCheckAuth = auth?.token;
    if (shouldCheckAuth ) authCheck();
    return () => {
      setIsMounted(false);
    };
  }, [auth.token, isMounted]);

  return ok ? <Outlet /> : <Spinner path="" />;
};
export default PrivateRoute;
