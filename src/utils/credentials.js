import { fromJson, toJson } from "./json";
import { storage } from "./storage";

export const fetchCredentials = () => {
  const credentials = storage.get("credentials");

  console.log(credentials)

  if (!credentials)
    return {
      instance: "",
      username: "",
      password: "",
    };

  const { instance, username, password } = fromJson(credentials);

  if (!instance || !username || !password)
    return {
      instance: "",
      username: "",
      password: "",
    };

  return { instance, username, password };
};

export const setCredentials = ({ instance, username, password }) => {
  const credentials = toJson({ instance, username, password });
  storage.set("credentials", credentials);
};
