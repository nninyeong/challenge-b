'use server';
import { redirect } from 'next/navigation';
import { createClient } from './supabase/server';

export const getReviewDetail = async (id: string) => {
  const serverClient = createClient();
  const { data, error } = await serverClient.from('reviews').select('*').eq('id', id);
  if (error) {
    throw new Error(`에러!: ${error}`);
  }
  return data[0];
};

export const getUserInfo = async () => {
  const serverClient = createClient();
  const { data, error } = await serverClient.auth.getUser();
  if (error || !data?.user) {
    return redirect('/signin');
  }
  return data;
};
