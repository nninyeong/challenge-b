import { useState } from 'react';

const useGuestBookButton = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateModalClick = () => {
    setShowCreateModal((prevState) => !prevState);
  };

  return {
    showCreateModal,
    handleCreateModalClick,
  };
};

export default useGuestBookButton;
