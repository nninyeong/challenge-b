import { getReviewDetail } from '@/utils/server-action';
import Image from 'next/image';

interface ParamsType {
  id: string;
}
const ReviewDetailPage = async ({ params }: { params: ParamsType }) => {
  console.log(params.id);
  const reviewData = await getReviewDetail(params.id);
  console.log(reviewData);
  return (
    <div>
      <div className=''>
        <Image
          src={reviewData.image_url[0]}
          fill
          alt={`${reviewData.id} 리뷰`}
        />
      </div>
    </div>
  );
};

export default ReviewDetailPage;
