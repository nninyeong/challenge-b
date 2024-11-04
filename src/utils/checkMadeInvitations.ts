import browserClient from './supabase/client';

export const checkMadeInvitations = async (id: string | undefined) => {
  const { data, error } = await browserClient.from('invitation').select('*').eq('user_id', id);
  if (error) {
    console.error(error);
    return null;
  }
  return data && data.length > 0;
};
