import { SignInFormValues, SignUpFormValues } from '@/types/auth.types';
import { useRouter } from 'next/navigation';
import { saveSessionDataToSupabase } from '@/utils/sessionStorage/saveSessionDataToSupabase';
import browserClient from '@/utils/supabase/client';
import { Notify } from 'notiflix';

const useAuthWithEmail = () => {
  const router = useRouter();

  const emailSignUp = async (formValues: SignUpFormValues) => {
    const { email, password, username } = formValues;
    const { data, error } = await browserClient.auth.signUp({
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
      Notify.failure(`회원가입에 문제가 생겼습니다. 다시 한 번 시도해주세요. (${error.message})`);
    } else {
      const userId = data?.user?.id;
      if (userId) {
        await saveSessionDataToSupabase(browserClient, userId);
      }
      Notify.success('회원가입 성공');
      router.push('/mypage');
    }
  };

  const emailSignIn = async (formValues: SignInFormValues) => {
    const { email, password } = formValues;
    const { error } = await browserClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('이메일 로그인 에러: ', error);
      Notify.failure('로그인에 문제가 발생했습니다. 다시 한 번 시도해주세요.');
      return { isSuccess: false, error };
    }

    const { data } = await browserClient.auth.getUser();
    const userId = data?.user?.id;
    if (userId) {
      await saveSessionDataToSupabase(browserClient, userId);
    }

    router.refresh();
    router.push('/');
    return { isSuccess: true, error: null };
  };

  return { emailSignUp, emailSignIn };
};

export default useAuthWithEmail;
