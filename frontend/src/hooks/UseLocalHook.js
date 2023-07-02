import { useEffect, useState } from 'react';

const useLocalStorageHook = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const storageSave = localStorage.getItem(key);
    if (storageSave) {
      return JSON.parse(storageSave);
    }
    return defaultValue;

  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorageHook
