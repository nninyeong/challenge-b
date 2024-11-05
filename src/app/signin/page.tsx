'use client';
import { handleGoogleSignIn, handleKakaoSignIn } from '@/utils/supabase/signIn';
import AuthForm from '@/components/auth/AuthForm';
import Link from 'next/link';
import { Notify } from 'notiflix';

const SignInPage = () => {
  const alertComingSoon = () => {
    Notify.info('준비중인 서비스입니다.');
  };

  return (
    <div className='flex flex-col items-center px-[16px] mb-[24px]'>
      <div className='flex flex-col gap-[8px] items-center mt-[24px]'>
        <img
          src='/assets/images/branding/logoIcon.svg'
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
        <div className='flex gap-[16px] text-[12px] text-center whitespace-pre leading-[12px]'>
          <button
            className='w-[88px] h-[88px] border rounded-full bg-[#FAE100] flex flex-col justify-center items-center gap-[10px]'
            onClick={handleKakaoSignIn}
          >
            <img
              src='/assets/images/button/kakaoIcon.svg'
              alt='카카오 로그인'
            />
            <p>카카오{'\n'}로그인</p>
          </button>
          <button
            className='w-[88px] h-[88px] border rounded-full bg-white flex flex-col justify-center items-center gap-[10px]'
            onClick={handleGoogleSignIn}
          >
            <img
              src='/assets/images/button/googleIcon.svg'
              alt='구글 로그인'
            />
            <p>구글{'\n'}로그인</p>
          </button>
          <button
            className='w-[88px] h-[88px] border rounded-full bg-[#03CF5C] flex flex-col justify-center items-center gap-[10px]'
            onClick={alertComingSoon}
          >
            <img
              src='/assets/images/button/naverIcon.svg'
              alt='네이버 로그인'
            />
            <p>네이버{'\n'}로그인</p>
          </button>
        </div>
      </section>
    </div>
  );
};

export default SignInPage;
