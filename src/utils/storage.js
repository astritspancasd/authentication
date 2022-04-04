export const storage = {
  set: (key, data) => {
    localStorage.setItem(key, data);
  },
  get: (key) => {
    return localStorage.getItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};
