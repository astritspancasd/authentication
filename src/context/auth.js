import React, { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import SnackbarUtils from "../ui/SnackbarUtils";

import { loginRequest } from "../http/requests";

let socket;

export const Context = createContext({
  token: "",
});

export const useAuthContext = () => useContext(Context);

const fetchCredentials = () => {
  const credentials = window.localStorage.getItem("credentials");

  if (!credentials)
    return {
      instance: "",
      username: "",
      password: "",
    };

  const { instance, username, password } = JSON.parse(credentials);

  if (!instance || !username || !password)
    return {
      instance: "",
      username: "",
      password: "",
    };

  return { instance, username, password };
};

const setCredentials = ({ instance, username, password }) => {
  const credentials = JSON.stringify({ instance, username, password });
  window.localStorage.setItem("credentials", credentials);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState("");
  const [loading, setLoading] = useState(false);
  const [{ instance, username, password }, setState] = useState(
    fetchCredentials()
  );

  const login = async () => {
    if (!instance || !username || !password) return;

    setCredentials({ instance, username, password });

    try {
      setLoading(true);
      const res = await loginRequest({ instance, username, password });
      setToken(res.data);
      setDecoded(jwt_decode(res.data));
      SnackbarUtils.success("Authentication successful");
    } catch (error) {
      SnackbarUtils.error("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    login();
    const interval = setInterval(() => login(), 1000 * 60 * 4);

    return () => clearInterval(interval);
  }, []);

  return (
    <Context.Provider
      value={{
        token,
        decoded,
        socket,
        instance,
        username,
        password,
        loading,
        handleChange,
        login,
      }}
    >
      {children}
    </Context.Provider>
  );
};
