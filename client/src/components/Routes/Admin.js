import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const BASE_URL = "https://onlinesite.onrender.com";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const { auth } = useAuth();

  
    const authCheck =  useCallback(async () => {
      const res = await axios.get(`${BASE_URL}/api/v1/auth/Admin-auth`);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    },[]);
    useEffect(() => {
    if (auth?.token) authCheck();
  }, [auth.token,authCheck]);

  return ok ? <Outlet /> : <Spinner path="" />;
};
export default AdminRoute;
