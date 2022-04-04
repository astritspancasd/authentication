import { http } from ".";

export const loginRequest = ({ instance, username, password }) =>
  http({
    method: "POST",
    url: `${instance}`,
    data: {
      username,
      password,
      locationId: "1",
    },
  });
