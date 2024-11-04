'use client';

import { useGetReviewOnlyUser } from '@/hooks/queries/review/useGetReview';
import { useReviewBottomSheetContext } from '@/provider/reviewBottomSheetProvider';
import { User } from '@/types/users.types';
import { Notify } from 'notiflix';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import ReviewCard from '../review/ReviewCard';

const MENU_LISTS = [
  { name: '결제내역' },
  { name: '1:1문의' },
  { name: '방문객 명단 다운로드' },
  { name: '나의 후기관리' },
] as const;

type MenuNameType = (typeof MENU_LISTS)[number]['name'];

type MyPageUserProps = {
  user: {
    user: User;
  };
};

const MyPageNavigatorList = ({ user }: MyPageUserProps) => {
  const { isReviewBottomSheetOpen, setIsReviewBottomSheetOpen } = useReviewBottomSheetContext();

  const userId = user.user.id;
  const { data: myReview, isLoading, error } = useGetReviewOnlyUser(userId);

  const handleMyReviewNavigator = (name: MenuNameType) => {
    if (name === '나의 후기관리') {
      setIsReviewBottomSheetOpen((prev: boolean) => !prev);
    } else {
      Notify.failure('준비중인 서비스입니다.');
    }
  };

  return (
    <nav className='mt-4'>
      <ul className='flex flex-col gap-4 items-center'>
        {MENU_LISTS.map((menu) => (
          <li
            key={menu.name}
            className='w-full border border-solid border-l-0 border-r-0 border-t-0 border-gray-100 cursor-pointer flex justify-between items-center p-2'
            onClick={() => handleMyReviewNavigator(menu.name)}
          >
            {menu.name}
            <FaChevronRight className='text-gray-700' />
          </li>
        ))}
      </ul>

      {isReviewBottomSheetOpen && (
        <div className='mt-4'>
          {isLoading && <p>로딩 중...</p>}
          {error && <p className='text-red-500'>오류가 발생했습니다: {error.message}</p>}
          {myReview ? <ReviewCard reviews={myReview} /> : <p>작성한 후기가 없습니다.</p>}
        </div>
      )}
    </nav>
  );
};

export default MyPageNavigatorList;
