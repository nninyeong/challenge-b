import browserClient from './supabase/client';

const deleteMyReview = async (id: string) => {
  const { data, error } = await browserClient.from('reviews').delete().eq('user_id', id);
  if (error) {
    throw new Error();
  }
  return data;
};

export default deleteMyReview;
