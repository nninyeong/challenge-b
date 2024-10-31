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
      className={`p-1 pl-2 pr-2 rounded-xl ${isActive ? 'bg-primary300 text-white' : ''}`}
    >
      {children}
    </button>
  );
};

export default GalleryButton;
