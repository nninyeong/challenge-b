import { ReactNode } from 'react';

const Button = ({
  children,
  className,
  onClick,
  type = 'button',
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'submit' | 'button';
}) => {
  return (
    <button
      className={`bg-primary-300 text-white font-bold ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
