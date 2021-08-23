import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? true : !!value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
      // console.log("定时器已建立");
    }, delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => {
      clearTimeout(timeout);
      // console.log("定时器已销毁");
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = document.title;
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
    //eslint-disable-next-line
  }, []);
};
