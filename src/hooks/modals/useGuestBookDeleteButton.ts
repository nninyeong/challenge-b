import { useState } from 'react';

const useGuestBookButton = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteModalClick = () => {
    setShowDeleteModal((prevState) => !prevState);
  };

  return {
    showDeleteModal,
    handleDeleteModalClick,
  };
};

export default useGuestBookButton;