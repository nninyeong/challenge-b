'use client';

import { useForm } from 'react-hook-form';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const AuthForm = () => {
  const client = createClient();
  const router = useRouter();

  // TODO: zod 유효성검사 추가

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
  });

  const handleAuthSubmit = async (formData) => {
    const { email, password, username } = formData;

    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      console.error('회원가입 오류: ', error);
      alert('오류가 발생했습니다. 다시 한 번 시도해주세요.');
    } else {
      alert('회원가입 성공');
      router.push('/signin');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleAuthSubmit)}>
        <label htmlFor='email'>이메일</label>
        <input
          id='email'
          {...register('email')}
        />
        <label htmlFor='password'>비밀번호</label>
        <input
          id='password'
          type='password'
          {...register('password')}
        />
        <label htmlFor='passwordCheck'>비밀번호 확인</label>
        <input
          id='passwordCheck'
          type='password'
          {...register('passwordCheck')}
        />
        <label htmlFor='username'>이름</label>
        <input
          id='username'
          type='text'
          {...register('username')}
        />
        <button type='submit'>회원가입</button>
      </form>
    </div>
  );
};

export default AuthForm;
