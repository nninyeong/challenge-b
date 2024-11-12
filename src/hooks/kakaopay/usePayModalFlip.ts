import { useState } from 'react';

const usePayModalFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return { isFlipped, toggleFlip };
};

export default usePayModalFlip;
