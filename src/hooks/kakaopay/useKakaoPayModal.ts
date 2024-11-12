import { useState } from 'react';

const useKakaoPayModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openKakaoPayModal = (index: number, value: string) => {
    setSelectedIndex(index);
    setModalValue(value);
    document.documentElement.style.overflow = 'hidden';
    setIsModalOpen(true);
  };

  const closeKakaoPayModal = () => {
    document.documentElement.style.overflow = 'auto';
    setIsModalOpen(false);
    setModalValue('');
    setSelectedIndex(null);
  };

  return {
    isModalOpen,
    modalValue,
    selectedIndex,
    setModalValue,
    openKakaoPayModal,
    closeKakaoPayModal,
  };
};

export default useKakaoPayModal;
