import { useState } from 'react';

const useGuestBookDeleteButton = () => {
  const [isAccordionOpen, setAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setAccordionOpen((prevState) => !prevState);
  };

  return {
    isAccordionOpen,
    toggleAccordion,
  };
};

export default useGuestBookDeleteButton;