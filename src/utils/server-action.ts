'use server';

import { createClient } from './supabase/server';

export const getUserInfo = async () => {
  const serverClient = createClient();
  try {
    const { data } = await serverClient.auth.getUser();
    return data;
  } catch (error) {
    console.error(error);
  }
};
