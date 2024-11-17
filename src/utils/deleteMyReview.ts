import browserClient from './supabase/client';

const deleteMyReview = async (id: string) => {
  console.log('삭제 요청 ID:', id); // 추가된 디버깅 코드
  const { data, error } = await browserClient.from('reviews').delete().eq('user_id', id);
  if (error) {
    console.error('리뷰 삭제 오류:', error.message);
    throw new Error();
  }
  return data;
};

export default deleteMyReview;
