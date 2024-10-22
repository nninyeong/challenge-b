import { User } from '@supabase/supabase-js';
import browserClient from './supabase/client';

export const getUserInfoApi = async (): Promise<User | null> => {
  const { data, error } = await browserClient.auth.getSession();
  if (error) {
    console.log('Mypage getUser error', error.message);
    return null;
  }

  return data.session?.user || null;
};
