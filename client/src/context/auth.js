import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      try {
        const parseData = JSON.parse(data);
        setAuth({
          ...auth,
          user: parseData.user,
          token: parseData.token,
        });
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => {
//   return useContext(AuthContext);
// custom hook

const useAuth = () => useContext(AuthContext);

export { useAuth };
