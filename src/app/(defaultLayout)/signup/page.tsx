import AuthForm from '@/components/auth/AuthForm';

const SignUpPage = () => {
  return (
    <div className='flex flex-col items-center px-[16px]'>
      <div className='flex flex-col gap-[8px] desktop:gap-[16px] items-center mt-[24px]'>
        <img
          src='/assets/images/branding/3D-logo.webp'
          alt='드림카드'
          className='w-[88px] desktop:w-[104px]'
        />
        <h3 className='font-HakgyoansimWoojuR text-primary-300 text-[20px] desktop:text-[36px] whitespace-pre-line text-center leading-[120%] tracking-[-0.04px]'>{`당신의 꿈을 담은 초대\n드림카드에서!`}</h3>
      </div>
      <AuthForm mode='signup' />
    </div>
  );
};

export default SignUpPage;
