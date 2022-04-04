export const toJson = (data) => JSON.stringify(data);

export const fromJson = (data) => (isJson(data) ? JSON.parse(data) : null);

export const isJson = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

export const formatJson = (data, replacer = null, space = 2) => {
  return JSON.stringify(data, replacer, space);
};
