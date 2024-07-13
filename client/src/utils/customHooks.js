import { useEffect, useState } from "react";

//custom Hook for local storage
export const useLocalStorage = (key, initValue) => {
  const storedValue = localStorage.getItem(key);
  const init = storedValue ? JSON.parse(storedValue) : initValue;

  //create a state variable
  const [value, setValue] = useState(init);

  //update local storage whenever state changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

//custom Hook for local storage
export const useSyncLocalStorage = (file) => {
  const storedValue = localStorage.getItem(file.key);
  const init = storedValue? JSON.parse(storedValue): file.value;

  //create a state variable
  const [values, setValues] = useState(init);

  //update local storage whenever state changes
  // useEffect(() => {
    localStorage.setItem(file.key, JSON.stringify(values));
  // }, [file, values]);

  return [values, setValues];
};
