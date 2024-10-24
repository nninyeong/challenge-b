import { ReviewResponse } from '@/types/review.types';
import Image from 'next/image';

const ReviewImage = ({ reviews }: ReviewResponse) => {
  return (
    <div className='flex flex-wrap'>
      {reviews.map((review) =>
        review.image_url?.map((reviewImg, imgIndex) => (
          <Image
            key={imgIndex}
            src={reviewImg}
            alt={`후기 이미지 ${imgIndex + 1}`}
            width={100}
            height={100}
            style={{ width: 'auto' }}
            priority
          />
        )),
      )}
    </div>
  );
};

export default ReviewImage;
