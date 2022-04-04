import { fromJson, toJson } from "./json";
import { storage } from "./storage";

const emptyCredentials = {
  instance: "",
  username: "",
  password: "",
};

export const fetchCredentials = () => {
  const credentials = storage.get("credentials");

  if (!credentials) return emptyCredentials;

  const { instance, username, password } = fromJson(credentials);

  if (!instance || !username || !password) return emptyCredentials;

  return { instance, username, password };
};

export const setCredentials = ({ instance, username, password }) => {
  const credentials = toJson({ instance, username, password });
  storage.set("credentials", credentials);
};
