import { useState } from 'react';

const useAttendanceButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClick = () => {
    setShowModal((prevState) => !prevState);
  };

  return {
    showModal,
    handleModalClick,
  };
};

export default useAttendanceButton;