import browserClient from './supabase/client';

const deleteMyReview = async (id: string) => {
  const { data, error } = await browserClient.from('reviews').delete().eq('user_id', id);
  if (error) console.error(error);
  return data;
};

export default deleteMyReview;
