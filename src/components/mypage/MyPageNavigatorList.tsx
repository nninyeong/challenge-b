'use client';

import { useReviewBottomSheetContext } from '@/provider/reviewBottomSheetProvider';
import Link from 'next/link';
import MyPageMenuItem from './MyPageMenuItem';

const MENU_LISTS = [
  { name: '결제내역', href: '/' },
  { name: '1:1문의', href: '/' },
  { name: '방문객 명단 다운로드' },
  { name: '나의 후기관리', href: '/review' },
] as const;
type MenuNameType = (typeof MENU_LISTS)[number]['name'];
const MyPageNavigatorList = () => {
  const { setIsReviewBottomSheetOpen } = useReviewBottomSheetContext((state) => state);
  const handleMyReviewNavigator = (name: MenuNameType) => {
    if (name === '나의 후기관리') {
      setIsReviewBottomSheetOpen(true);
    }
  };
  return (
    <nav className='mt-4'>
      <ul className='flex flex-col gap-4 items-center'>
        {MENU_LISTS.map((menu) => {
          if (menu.name === '방문객 명단 다운로드') {
            return (
              <MyPageMenuItem
                key={menu.name}
                name={menu.name}
              />
            );
          }

          return (
            <Link
              href={menu.href!}
              key={menu.name}
              className='w-full border border-solid border-l-0 border-r-0 border-t-0 border-gray-100 cursor-pointer'
              onClick={() => handleMyReviewNavigator(menu.name)}
            >
              <MyPageMenuItem name={menu.name} />
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default MyPageNavigatorList;
