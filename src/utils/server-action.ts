'use server';

import { redirect } from 'next/navigation';
import { createClient } from './supabase/server';

export const getUserInfo = async () => {
  const serverClient = createClient();
  const { data, error } = await serverClient.auth.getUser();
  if (error || !data?.user) {
    redirect('/signin');
  }
  return data;
};
