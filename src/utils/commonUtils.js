export const isDefined = (value) => {
  return value !== undefined && value !== null;
};

export const isJSONString = (str) => {
  try {
    const parsedJSON = JSON.parse(str);
    return typeof parsedJSON === "object" && parsedJSON !== null;
  } catch (error) {
    return false;
  }
};