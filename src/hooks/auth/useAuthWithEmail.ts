import { SignInFormValues, SignUpFormValues } from '@/types/auth.types';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const useAuthWithEmail = () => {
  const router = useRouter();
  const client = createClient();

  const emailSignUp = async (formValues: SignUpFormValues) => {
    const { email, password, username } = formValues;
    const { error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          display_name: username,
          full_name: username,
        },
      },
    });

    if (error) {
      console.error('회원가입 오류: ', error);
      alert(`회원가입에 문제가 생겼습니다. 다시 한 번 시도해주세요. (${error.message})`);
    } else {
      alert('회원가입 성공');
      router.push('/mypage');
    }
  };

  const emailSignIn = async (formValues: SignInFormValues) => {
    const { email, password } = formValues;
    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('이메일 로그인 에러: ', error);
      alert('로그인에 문제가 발생했습니다. 다시 한 번 시도해주세요.');
      return { isSuccess: false, error };
    }

    const { data } = await client.auth.getUser();
    console.log('here is emailSinIn Fn, user: ', data.user);

    router.refresh();
    router.push('/');
    return { isSuccess: true, error: null };
  };

  return { emailSignUp, emailSignIn };
};

export default useAuthWithEmail;
