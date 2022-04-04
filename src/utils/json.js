export const toJson = (data) => JSON.stringify(data);

export const fromJson = (data) => JSON.parse(data);

export const isJson = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

export const formatJson = (data, replacer = null, space = 2) => {
  JSON.stringify(data, replacer, space);
};