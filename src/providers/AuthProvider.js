import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SnackbarUtils } from "../ui";

import { loginRequest } from "../http";
import { decodeToken, fromJson, storage, fetchCredentials, setCredentials } from "../utils";

export const Context = createContext({
  token: "",
  autoRefetching: false,
  setAutoRefetching: () => {},
});

export const useAuthContext = () => useContext(Context);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoRefetching, setAutoRefetching] = useState(
    Boolean(fromJson(storage.get("autoRefetching")))
  );
  const [{ instance, username, password }, setState] = useState(
    fetchCredentials()
  );

  const login = useCallback(async () => {
    if (!instance || !username || !password) return;

    setCredentials({ instance, username, password });

    try {
      setLoading(true);
      const res = await loginRequest({ instance, username, password });
      setToken(res.data);
      setDecoded(decodeToken(res.data));
      SnackbarUtils.success("Authentication successful");
    } catch (error) {
      SnackbarUtils.error("Authentication failed");
    } finally {
      setLoading(false);
    }
  }, [instance, username, password]);

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleAutoRefetching = () => {
    storage.set("autoRefetching", !autoRefetching);
    setAutoRefetching((prevState) => !prevState);
  };

  useEffect(() => {
    login();
    const interval = setInterval(() => {
      if (autoRefetching) {
        login();
      }
    }, 1000 * 60 * 4);

    return () => clearInterval(interval);
  }, [autoRefetching, login]);

  return (
    <Context.Provider
      value={{
        token,
        decoded,
        instance,
        username,
        password,
        loading,
        autoRefetching,
        toggleAutoRefetching,
        handleChange,
        login,
      }}
    >
      {children}
    </Context.Provider>
  );
};
