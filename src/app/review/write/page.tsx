import ReviewForm from '@/components/review/reviewForm';
import { getUserInfo } from '@/utils/server-action';

const WriteReviewPage = async () => {
  const user = await getUserInfo();
  return (
    <div>
      <ReviewForm userId={user?.user?.id} />
    </div>
  );
};

export default WriteReviewPage;
