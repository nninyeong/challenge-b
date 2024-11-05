import AuthForm from '@/components/auth/AuthForm';

const SignUpPage = () => {
  return (
    <div className='px-[16px]'>
      <div className='flex flex-col gap-[8px] items-center mt-[24px]'>
        <img
          src='/assets/images/branding/3D-logo.webp'
          alt='드림카드'
          className='w-[88px] h-[88px]'
        />
        <img
          src='/assets/images/branding/당신의-꿈을-담은-초대-드림카드에서_.webp'
          alt='당신의 꿈을 담은 초대 드림카드에서!'
          className='w-[163px]'
        />
      </div>
      <AuthForm mode='signup' />
    </div>
  );
};

export default SignUpPage;
