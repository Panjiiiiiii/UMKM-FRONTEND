const getLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data ?? "";
  }
  return "";
};

const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

const deleteLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
  return "";
};

export { getLocalStorage, deleteLocalStorage, setLocalStorage };
