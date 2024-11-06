'use client';
import { Review } from '@/types/review.types';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { User } from '@/types/users.types';
import { useAuthUserQuery } from '@/hooks/queries/review/useGetReview';
import ReviewItem from './ReviewItem';

type ReviewsCardProp = {
  reviews: Review[];
};

const ReviewCard = ({ reviews }: ReviewsCardProp) => {
  const router = useRouter();
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const { data: users, isLoading, error } = useAuthUserQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>오류 발생</div>;

  const handleReviewDetail = (id: string) => router.push(`/review/${id}`);
  const toggleContent = (id: string) => setExpandedReview((prev) => (prev === id ? null : id));

  return (
    <div>
      {reviews.map((review) => {
        const user = users?.users.find((u: User) => u.id === review.user_id);
        if (!user) return <div key={review.id}>사용자를 찾을 수 없습니다.</div>;

        return (
          <ReviewItem
            key={review.id}
            review={review}
            user={user}
            isExpanded={expandedReview === review.id}
            onToggle={() => toggleContent(review.id)}
            onNavigate={() => handleReviewDetail(review.id)}
          />
        );
      })}
    </div>
  );
};

export default ReviewCard;
