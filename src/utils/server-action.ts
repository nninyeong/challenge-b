'use server';

import { createClient } from './supabase/server';

export const getReviewDetail = async (id: string) => {
  const serverClient = createClient();
  try {
    const { data, error } = await serverClient.from('reviews').select('*').eq('id', id);
    if (error) {
      throw new Error(`에러!: ${error}`);
    }
    return data[0];
  } catch (error) {
    console.error(error);
  }
};
