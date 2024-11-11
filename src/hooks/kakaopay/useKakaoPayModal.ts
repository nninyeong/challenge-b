import { useState } from 'react';

const useKakaoPayModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number, value: string) => {
    setSelectedIndex(index);
    setModalValue(value);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalValue('');
    setSelectedIndex(null);
  };

  return {
    isModalOpen,
    modalValue,
    selectedIndex,
    setModalValue,
    openModal,
    closeModal,
  };
};

export default useKakaoPayModal;
