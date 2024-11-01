import ReviewContentsBox from '@/components/review/ReviewContentsBox';
import ReviewSlide from '@/components/review/ReviewSlide';
import { getReviewDetail } from '@/utils/server-action';

interface ParamsType {
  id: string;
}
type ReviewType = {
  id: string;
  created_at: string;
  user_id: string;
  content: string;
  image_url: string[] | null;
  user_name: string | null;
  avatar_url: string | null;
};

const ReviewDetailPage = async ({ params }: { params: ParamsType }) => {
  const reviewData: ReviewType = await getReviewDetail(params.id);

  return (
    <div
      className='relative'
      style={{ minHeight: 'calc(100vh - 114px)' }}
    >
      <ReviewSlide images={reviewData.image_url!} />

      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60'></div>
      <ReviewContentsBox
        writer={reviewData.user_name!}
        content={reviewData.content}
        created={reviewData.created_at}
        avatar_url={reviewData.avatar_url}
      />
    </div>
  );
};

export default ReviewDetailPage;
