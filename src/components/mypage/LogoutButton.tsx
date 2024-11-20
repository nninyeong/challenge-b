'use client';
import useSignOut from '@/hooks/auth/useSignOut';

const LogoutButton = () => {
  const { handleSignOut } = useSignOut();
  return (
    <div className='w-full flex justify-center'>
      <button
        className='w-[343px] bg-primary-300 text-[16px] mt-[16px] mb-[16px] h-[40px] font-bold rounded-[8px] text-center cursor-pointer text-white desktop:w-[400px] desktop:h-[56px] mx-auto'
        onClick={handleSignOut}
      >
        로그아웃
      </button>
    </div>
  );
};

export default LogoutButton;
