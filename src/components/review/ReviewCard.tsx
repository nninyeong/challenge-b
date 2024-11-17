'use client';
import { Review } from '@/types/review.types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '@/types/users.types';
import { useAuthUserQuery } from '@/hooks/queries/review/useGetReview';
import ReviewItem from './ReviewItem';
import { useAddLikeMutation, useRemoveLikeMutation } from '@/hooks/queries/review/useReviewLike';
import { useSignedAuthUser } from '@/hooks/queries/useSignedAuthUser';
import { Notify } from 'notiflix';

type ReviewsCardProp = {
  reviews: Review[];
};

const ReviewCard = ({ reviews }: ReviewsCardProp) => {
  const router = useRouter();
  const [expandedReview, setExpandedReview] = useState<string | null>(null);

  const { data: users, isLoading, error } = useAuthUserQuery();
  const { data: currentUser } = useSignedAuthUser();

  const addLikeMutate = useAddLikeMutation();
  const removeLikeMutate = useRemoveLikeMutation();
  const signedUserId = currentUser?.id || '';

  const handleLikeToggle = async (review: Review) => {
    if (!signedUserId) return Notify.failure('로그인한 유저만 사용가능합니다.');

    const isLiked = review.likes?.includes(signedUserId);
    if (isLiked) {
      await removeLikeMutate.mutate({ postId: review.id, userId: signedUserId });
    } else {
      await addLikeMutate.mutate({ postId: review.id, userId: signedUserId });
    }
  };

  const getLikeCount = (likes: string | string[] | null | undefined) => {
    if (!likes || (Array.isArray(likes) && likes.length === 0)) {
      return 0;
    }
    if (likes === '[]') return 0;

    if (typeof likes === 'string') {
      const splitLikes = likes.split(',').filter((like) => like.trim() !== '');
      return splitLikes.length;
    }

    const likesLength = Array.isArray(likes) ? likes.length : 0;
    return likesLength >= 1000 ? '999+' : likesLength;
  };

  const handleReviewDetail = (id: string) => router.push(`/review/${id}`);

  const toggleContent = (id: string) => setExpandedReview((prev) => (prev === id ? null : id));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>오류 발생</div>;

  return (
    <div>
      {reviews.map((review) => {
        const user = users?.users.find((u: User) => u.id === review.user_id);

        if (!user)
          return (
            <div
              className='text-center text-[14px] text-gray-300'
              key={review.id}
            >
              사용자를 찾을 수 없습니다.
            </div>
          );

        const isLiked = review.likes?.includes(signedUserId) ?? false;

        const likeCount = getLikeCount(review.likes);

        return (
          <ReviewItem
            key={review.id}
            review={review}
            user={user}
            isExpanded={expandedReview === review.id}
            onToggle={() => toggleContent(review.id)}
            onNavigate={() => handleReviewDetail(review.id)}
            isLiked={isLiked}
            onLikeToggle={() => handleLikeToggle(review)}
            likeCount={likeCount}
          />
        );
      })}
    </div>
  );
};

export default ReviewCard;
