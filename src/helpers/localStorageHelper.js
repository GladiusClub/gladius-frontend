import { isJSONString } from "utils/commonUtils";

export const getItem = (key) => {
  const item = localStorage.getItem(key);
  return isJSONString(item) ? JSON.parse(item) : item;
};

export const setItem = (key, data) => {
  const item = typeof data === "object" ? JSON.stringify(data) : data;
  localStorage.setItem(key, item);
  return item;
};

export const removeItem = (key) => {
  const item = getItem(key);
  localStorage.removeItem(key);
  return item;
};

export const clear = () => {
  localStorage.clear();
};
