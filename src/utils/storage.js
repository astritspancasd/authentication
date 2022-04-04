export const storage = {
  set: (key, data) => {
    localStorage.setItem(key, data);
  },
  get: (key) => {
    localStorage.getItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};
