'use client';

import { useGetReviewOnlyUser } from '@/hooks/queries/review/useGetReview';
import { useReviewBottomSheetContext } from '@/provider/reviewBottomSheetProvider';
import { Notify } from 'notiflix';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import ReviewCard from '../review/ReviewCard';
import { useDownloadCsv } from '@/hooks/queries/mypage/useDownloadCsv';

const MENU_LISTS = [
  { name: '결제내역' },
  { name: '1:1문의' },
  { name: '방문객 명단 다운로드' },
  { name: '나의 후기관리' },
] as const;

type MenuNameType = (typeof MENU_LISTS)[number]['name'];

const MyPageNavigatorList = () => {
  const { downloadCsv } = useDownloadCsv();
  const { isReviewBottomSheetOpen, setIsReviewBottomSheetOpen } = useReviewBottomSheetContext((state) => state);
  const { data: myReview, isLoading, error } = useGetReviewOnlyUser();
  const reviewsData = myReview ? (Array.isArray(myReview) ? myReview : [myReview]) : [];

  const handleMyReviewNavigator = (name: MenuNameType) => {
    if (name === '나의 후기관리') {
      setIsReviewBottomSheetOpen(!isReviewBottomSheetOpen);
    } else if (name === '방문객 명단 다운로드') {
      downloadCsv();
    } else {
      Notify.info('준비중인 서비스입니다.');
    }
  };

  return (
    <nav>
      <ul className='flex flex-col  items-center'>
        {MENU_LISTS.map((menu) => (
          <li
            key={menu.name}
            className='w-full border border-solid border-l-0 border-r-0 border-t-0 border-gray-200 cursor-pointer flex justify-between items-center pt-[19.5px] pb-[19.5px] font-medium'
            onClick={() => handleMyReviewNavigator(menu.name)}
          >
            {menu.name}
            {isReviewBottomSheetOpen && menu.name === '나의 후기관리' ? (
              <FaChevronDown className='text-gray-700' />
            ) : (
              <FaChevronRight className='text-gray-700' />
            )}
          </li>
        ))}
      </ul>
      {isReviewBottomSheetOpen && (
        <div className='mt-4'>
          {isLoading && <p>로딩 중...</p>}
          {error && <p className='text-red-500'>오류가 발생했습니다: {error.message}</p>}
          {myReview ? (
            <ReviewCard reviews={reviewsData} />
          ) : (
            <p className='w-full text-center'>작성한 후기가 없습니다.</p>
          )}
        </div>
      )}
    </nav>
  );
};

export default MyPageNavigatorList;
