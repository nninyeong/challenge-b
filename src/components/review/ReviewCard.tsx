import { Review } from '@/types/review.types';
import defaultImg from '@/assets/images/defaultImg.jpg';
import Image from 'next/image';

type ReviewsCardProp = {
  reviews: Review[];
};

const ReviewCard = ({ reviews }: ReviewsCardProp) => {
  return (
    <div>
      {reviews.map((review) => (
        <div
          key={review.id}
          className='flex border border-solid mb-4 p-4'
        >
          {Array.isArray(review.image_url) && review.image_url.length > 0 ? (
            review.image_url.map((imageUrl, index) => (
              <Image
                key={`${index}+${imageUrl}`}
                src={imageUrl}
                alt={`후기 이미지 ${index + 1}`}
                width={100}
                height={100}
                style={{ width: 'auto' }}
                priority
              />
            ))
          ) : (
            <Image
              src={defaultImg}
              alt='기본 이미지'
              width={100}
              height={100}
              style={{ width: 'auto' }}
              priority
            />
          )}
          <div className='flex flex-col ml-4'>
            <div className='flex justify-between'>
              <h3>{review.user_name}</h3>
              <p>{review.created_at}</p>
            </div>
            <p>{review.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCard;
