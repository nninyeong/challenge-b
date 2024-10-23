'use client';

import { useForm } from 'react-hook-form';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const AuthForm = () => {
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
        <div>
          <input
            type='text'
            className='border rounded w-full h-[48px] px-5'
            placeholder='이메일'
            {...register('email')}
          />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
        </div>
        <div>
          <input
            id='password'
            type='password'
            className='border rounded w-full h-[48px] px-5'
            placeholder='비밀번호'
            {...register('password')}
          />
          {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
        </div>
        {mode === 'signup' && (
          <>
            <div>
              <input
                id='passwordCheck'
                type='password'
                className='border rounded w-full h-[48px] px-5'
                placeholder='비밀번호 확인'
                {...register('passwordCheck')}
              />
              {'passwordCheck' in errors && <p className='text-red-500 text-sm'>{errors.passwordCheck?.message}</p>}
            </div>
            <div>
              <input
                id='username'
                type='text'
                className='border rounded w-full h-[48px] px-5'
                placeholder='이름'
                {...register('username')}
              />
              {'username' in errors && <p className='text-red-500 text-sm'>{errors.username?.message}</p>}
            </div>
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
