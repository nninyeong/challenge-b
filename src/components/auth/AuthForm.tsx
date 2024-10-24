'use client';

import { useForm } from 'react-hook-form';
import { SignInFormValues, SignUpFormValues } from '@/types/auth.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, signUpSchema } from '@/lib/zod/authSchema';
import InputForValidate from '@/components/auth/InputForValidate';
import useAuthWithEmail from '@/hooks/auth/useAuthWithEmail';

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
    <div>
      <form
        onSubmit={handleSubmit(handleAuthSubmit)}
        className='flex flex-col gap-[24px] mt-[50px]'
      >
        <InputForValidate
          type='text'
          placeholder='이메일'
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
        />
        {mode === 'signup' && (
          <>
            <InputForValidate
              type='password'
              placeholder='비밀번호 확인'
              validateFor='passwordCheck'
              register={register}
              errorMessage={'passwordCheck' in errors ? errors.passwordCheck?.message : undefined}
            />
            <InputForValidate
              type='text'
              placeholder='이름'
              validateFor='username'
              register={register}
              errorMessage={'username' in errors ? errors.username?.message : undefined}
            />
          </>
        )}
        <button
          type='submit'
          className='w-full border rounded h-[56px]'
        >
          {mode === 'signup' ? '회원가입' : '로그인'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
