import { User } from '@supabase/supabase-js';
import browserClient from './supabase/client';

export const getUserInfoApi = async (): Promise<User | null> => {
  try {
    const { data, error } = await browserClient.auth.getSession();
    if (error) {
      console.error('getUserInfoError', error);
    }
    return data.session?.user || null;
  } catch (error) {
    console.log('Mypage getUser error', error);
    return null;
  }

  return data.session?.user || null;
};
