import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? true : !!value);

export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (!isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line
  }, []);
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
      console.log("定时器已建立");
    }, delay);
    return () => {
      clearTimeout(timeout);
      console.log("定时器已销毁");
    };
  }, [value, delay]);

  return debouncedValue;
};
