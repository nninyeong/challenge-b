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
      className={`px-2 py-1 mr-1 desktop:mr-2 rounded-full text-[14px] font-medium ${isActive ? 'bg-primary300 text-white' : 'bg-gray-100 text-gray-400'}`}
    >
      {children}
    </button>
  );
};

export default GalleryButton;
