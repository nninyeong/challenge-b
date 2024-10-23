'use client';

import { useForm } from 'react-hook-form';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { SignInFormValues, SignUpFormValues } from '@/types/auth.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, signUpSchema } from '@/lib/zod/authSchema';
import InputForValidate from '@/components/auth/InputForValidate';

const AuthForm = ({ mode }: { mode: 'signin' | 'signup' }) => {
  const client = createClient();
  const router = useRouter();

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
    const { email, password, username } = formData as SignUpFormValues;

    if (mode === 'signup') {
      const { error } = await client.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            display_name: username,
          },
        },
      });

      if (error) {
        console.error('회원가입 오류: ', error);
        alert(`회원가입에 문제가 생겼습니다. 다시 한 번 시도해주세요. (${error.message})`);
      } else {
        alert('회원가입 성공');
        router.push('/signin/email');
      }
    }

    if (mode === 'signin') {
      const { error } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('로그인 에러: ', error);
        alert(`로그인에 문제가 생겼습니다. 다시 한 번 시도해주세요. (${error.message})`);
      } else {
        router.refresh();
        router.push('/');
      }
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
