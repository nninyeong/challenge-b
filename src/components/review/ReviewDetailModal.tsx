'use client';

import ReviewContentsBox from './ReviewContentsBox';
import ReviewSlide from './ReviewSlide';
import { useEffect, useState } from 'react';
import { ReviewType } from '@/app/(defaultLayout)/review/[id]/page';
import { getReviewDetail } from '@/utils/server-action';
import { getAuthUsersProfile } from '@/utils/getReview';
import { User } from '@/types/users.types';
import { ReviewDetailLoading } from '../loading/ReviewLoading';

type Props = {
  reviewId: string;
};

export const ReviewDetailModal = ({ reviewId }: Props) => {
  const [reviewData, setReviewData] = useState<ReviewType | null>(null);
  const [reviewUser, setReviewUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchReviewData = async () => {
      const data: ReviewType = await getReviewDetail(reviewId);
      setReviewData(data);

      const users = await getAuthUsersProfile();
      const user = users.users.find((e) => e.id === data.user_id);
      setReviewUser(user || null);
    };

    fetchReviewData();
  }, [reviewId]);

  if (!reviewData || !reviewUser) return <ReviewDetailLoading />;

  return (
    <div
      className='relative'
      style={{ minHeight: 780 }}
    >
      <ReviewSlide images={reviewData.image_url!} />

      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60' />
      <ReviewContentsBox
        user={reviewUser}
        content={reviewData.content}
        created={reviewData.created_at}
        avatar_url={reviewData.avatar_url}
      />
    </div>
  );
};
