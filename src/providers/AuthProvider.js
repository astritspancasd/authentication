import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { SnackbarUtils } from "../ui";

import { loginRequest } from "../http";
import { decodeToken, fromJson, storage, setCredentials, fetchCredentials } from "../utils";

export const Context = createContext({
  token: "",
  autoRefetching: false,
  setAutoRefetching: () => {},
});

const initialState = {
  token: "",
  decoded: "",
  loading: false,
  autoRefetching: Boolean(fromJson(storage.get("autoRefetching"))),
  instance: fetchCredentials().instance,
  username: fetchCredentials().username,
  password: fetchCredentials().password,
};

const ActionTypes = {
  START_LOADING: "START_LOADING",
  STOP_LOADING: "STOP_LOADING",
  SET_CREDENTIALS: "SET_CREDENTIALS",
  SET_AUTO_REFETCHING: "SET_AUTO_REFETCHING",
  INPUT_CHANGE: "INPUT_CHANGE",
  SET_TOKEN: "SET_TOKEN",
  SET_DECODED_TOKEN: "SET_DECODED_TOKEN",
};

const reducer = (state, action) => {
    console.log(action)
  switch (action.type) {
    case ActionTypes.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case ActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    case ActionTypes.SET_DECODED_TOKEN:
      return {
        ...state,
        decoded: action.payload.decoded,
      };
    case ActionTypes.SET_AUTO_REFETCHING:
      return {
        ...state,
        autoRefetching: !state.autoRefetching,
      };
    case ActionTypes.INPUT_CHANGE:
      return {
        ...state,
        [action.payload.target.name]: action.payload.target.value,
      };
    default:
      return state;
  }
};

export const useAuthContext = () => useContext(Context);

export const AuthProvider = ({ children }) => {
  const [
    { token, decoded, loading, autoRefetching, instance, username, password },
    dispatch,
  ] = useReducer(reducer, initialState);

  const login = useCallback(async () => {

    if (!instance || !username || !password) return;

    setCredentials({ instance, username, password });

    try {
      dispatch({
        type: ActionTypes.START_LOADING,
      });
      const res = await loginRequest({ instance, username, password });

      dispatch({
        type: ActionTypes.SET_TOKEN,
        payload: { token: res.data },
      });
      dispatch({
        type: ActionTypes.SET_DECODED_TOKEN,
        payload: { decoded: decodeToken(res.data) },
      });
      SnackbarUtils.success("Authentication successful");
    } catch (error) {
      dispatch({
        type: ActionTypes.SET_TOKEN,
        payload: { token: "" },
      });
      dispatch({
        type: ActionTypes.SET_DECODED_TOKEN,
        payload: { decoded: "" },
      });
      SnackbarUtils.error("Authentication failed");
    } finally {
      dispatch({
        type: ActionTypes.STOP_LOADING,
      });
    }
  }, [instance, username, password]);

  const handleChange = (e) => {
    dispatch({ type: ActionTypes.INPUT_CHANGE, payload: e });
  };

  const toggleAutoRefetching = () => {
    storage.set("autoRefetching", !autoRefetching);
    dispatch({ type: ActionTypes.SET_AUTO_REFETCHING });
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

  console.log(token);

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
