'use client';

import { useForm } from 'react-hook-form';
import { SignInFormValues, SignUpFormValues } from '@/types/auth.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, signUpSchema } from '@/lib/zod/authSchema';
import InputForValidate from '@/components/auth/InputForValidate';
import useAuthWithEmail from '@/hooks/auth/useAuthWithEmail';
import Button from '@/components/ui/Button';

const AuthForm = ({ mode }: { mode: 'signin' | 'signup' }) => {
  const { emailSignUp, emailSignIn } = useAuthWithEmail();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues | SignInFormValues>({
    resolver: zodResolver(mode === 'signup' ? signUpSchema : signInSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
  });

  const handleAuthSubmit = async (formData: SignUpFormValues | SignInFormValues) => {
    if (mode === 'signup') {
      await emailSignUp(formData as SignUpFormValues);
    }

    if (mode === 'signin') {
      await emailSignIn(formData as SignInFormValues);
    }
  };

  return (
    <div className='w-full desktop:w-[400px]'>
      <form
        onSubmit={handleSubmit(handleAuthSubmit)}
        className='flex flex-col mt-[40px] w-full'
      >
        {mode === 'signup' && (
          <InputForValidate
            type='text'
            placeholder='닉네임 최소 2글자'
            validateFor='username'
            register={register}
            errorMessage={'username' in errors ? errors.username?.message : undefined}
          />
        )}
        <InputForValidate
          type='text'
          placeholder='이메일 주소'
          validateFor='email'
          register={register}
          errorMessage={errors.email?.message}
        />
        <InputForValidate
          type='password'
          placeholder='비밀번호'
          validateFor='password'
          register={register}
          errorMessage={errors.password?.message}
          guideMessage={mode === 'signup' ? '최소 6자 이상' : undefined}
        />
        {mode === 'signup' && (
          <div className='mt-[24px]'>
            <InputForValidate
              type='password'
              placeholder='비밀번호 확인 입력'
              validateFor='passwordCheck'
              register={register}
              errorMessage={'passwordCheck' in errors ? errors.passwordCheck?.message : undefined}
            />
          </div>
        )}
        <Button
          type='submit'
          className={`w-full h-[56px] rounded-[12px] text-[20px] ${mode === 'signup' ? 'mt-[64px]' : 'mt-[48px]'}`}
        >
          {mode === 'signup' ? '회원가입' : '로그인'}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
