import { ReactNode } from 'react';

type GalleryButtonProps = {
  children: ReactNode;
  isActive: boolean;
  onClick?: () => void;
};

const GalleryButton = ({ children, isActive, onClick }: GalleryButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={` pl-2 pr-2 pt-1 pb-1 mr-1 rounded-full text-[14px] ${isActive ? 'bg-primary300 text-white' : 'bg-gray-100 text-gray-400'}`}
    >
      {children}
    </button>
  );
};

export default GalleryButton;
