import { useState, useCallback } from 'react';

function useToggle(value: boolean): [boolean, () => void] {
  const [toggle, setToggle] = useState(value);

  const toggleHandler = useCallback(() => {
    setToggle((prevValue) => !prevValue);
  }, []);

  return [toggle, toggleHandler];
}

export default useToggle;
