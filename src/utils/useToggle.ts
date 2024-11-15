import { useState, useCallback } from 'react';

const useToggle = (initialValue: boolean = true): [boolean, () => void] => {
  const [toggle, setToggle] = useState(initialValue);

  const toggleHandler = useCallback(() => {
    setToggle((prevValue) => !prevValue);
  }, []);

  return [toggle, toggleHandler];
};

export default useToggle;
