'use client';
import { handleGoogleSignIn, handleKakaoSignIn } from '@/utils/supabase/signIn';
import AuthForm from '@/components/auth/AuthForm';
import Link from 'next/link';

const SignInPage = () => {
  const alertComingSoon = () => {
    alert('준비중인 서비스입니다.');
  };

  return (
    <div className='flex flex-col items-center px-[16px] font-suit'>
      <div className='flex flex-col gap-[8px] items-center mt-[24px]'>
        <img
          src='/assets/images/branding/mainLogo.svg'
          alt='드림카드'
          className='w-[88px] h-[88px]'
        />
        <img
          src='/assets/images/branding/slogan.svg'
          alt='당신의 꿈을 담은 초대 드림카드에서!'
        />
      </div>
      <section className='flex flex-col items-center gap-[16px] w-full'>
        <AuthForm mode='signin' />
        <div className='flex gap-[16px] text-[12px]'>
          <button onClick={alertComingSoon}>아이디 찾기</button>
          <button onClick={alertComingSoon}>비밀번호 찾기</button>
          <Link href='/signup'>회원가입</Link>
        </div>
        <h5 className='text-[20px] text-gray-600 mt-[40px]'>간편 로그인</h5>
        <button
          className='w-full h-[56px] border rounded'
          onClick={handleKakaoSignIn}
        >
          카카오로 시작하기
        </button>
        <button
          className='w-full h-[56px] border rounded'
          onClick={handleGoogleSignIn}
        >
          구글로 시작하기
        </button>
      </section>
    </div>
  );
};

export default SignInPage;
