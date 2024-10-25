import ReviewForm from '@/components/review/ReviewForm';
import { getUserInfo } from '@/utils/server-action';

const WriteReviewPage = async () => {
  const user = await getUserInfo();

  return (
    <div>
      <ReviewForm
        userId={user?.user?.id}
        userName={user?.user.user_metadata.name}
      />
    </div>
  );
};

export default WriteReviewPage;
