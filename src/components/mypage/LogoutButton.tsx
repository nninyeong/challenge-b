'use client';
import useSignOut from '@/hooks/auth/useSignOut';

const LogoutButton = () => {
  const { handleSignOut } = useSignOut();
  return (
    <button
      className='w-full bg-primary-300  font-bold p-4 mt-4 mb-12 rounded-[8px] text-center cursor-pointer text-white'
      onClick={handleSignOut}
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
