import { useState } from 'react';

const useAttendanceButton = () => {
  const [showModal, setShowModal] = useState(false);

  const openAttendanceModal = () => {
    setShowModal(true);
    document.documentElement.style.overflow = 'hidden';
  };

  const closeAttendanceModal = () => {
    document.documentElement.style.overflow = 'auto';
    setShowModal(false);
  };

  return {
    showModal,
    openAttendanceModal,
    closeAttendanceModal,
  };
};

export default useAttendanceButton;
