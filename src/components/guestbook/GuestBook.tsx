'use client';

import useGuestBookEntries, { fetchGuestBook, ITEMS_PER_PAGE } from '@/hooks/queries/guestbook/useGuestBookEntries';
import CreateGuestBook from './CreateGuestBook';
import GuestBookCard from './GuestBookCard';
import useInvitationIdByPathname from '@/hooks/invitation/useInvitationIdByPathname';
import { useEffect, useState } from 'react';
import GuestBookPagination from './GuestBookPagination';

import { ColorType } from '@/types/invitationFormType.type';
import colorConverter from '@/utils/colorConverter';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useQueryClient } from '@tanstack/react-query';

type GuestBookProps = {
  fontInfo: {
    color: ColorType;
    size: number;
  };
};
const GuestBook = ({ fontInfo }: GuestBookProps) => {
  const queryClient = useQueryClient();
  const { isCreatePage, invitationId } = useInvitationIdByPathname();
  const [page, setPage] = useState(1);
  const fontSize = fontInfo.size;
  const fontColor = fontInfo.color;
  const rgbaColor = colorConverter(fontColor);
  const { data, isLoading, error } = useGuestBookEntries(invitationId, page);

  const guestBooks = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  useEffect(() => {
    if (page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.guestBook(invitationId, page + 1),
        queryFn: () => fetchGuestBook(invitationId, page + 1),
        staleTime: 0,
      });
    }
  }, [page, totalPages, invitationId, queryClient]);

  const goOnePage = () => setPage(1);

  if (isLoading) return <div>방명록을 로딩중입니다...</div>;
  if (error) return <div>방명록을 불러오는 중 에러가 발생하였습니다.</div>;

  return (
    <div>
      <div
        style={{ fontSize: `${16 + fontSize}px`, color: `${rgbaColor}` }}
        className='text-opacity-50 text-center mb-6 tracking-[4px]'
      >
        GUEST BOOK
      </div>
      <CreateGuestBook
        invitationId={invitationId}
        isCreatePage={isCreatePage}
        goOnePage={goOnePage}
        totalPages={totalPages}
        rgbaColor={rgbaColor}
      />

      {guestBooks.length === 0 ? (
        <div className='text-black w-full px-4 mb-4'>
          <div className='bg-gray-50 rounded-xl px-4 h-[96px] flex flex-col justify-center items-center gap-[3px]'>
            <img
              src='/assets/images/empty-guestbook.webp'
              alt='청첩장게시글'
              className='w-[53px] h-[48px]'
              loading='lazy'
            />
            <span className='text-gray-700 font-medium'>아직 남긴 방명록이 없어요.</span>
          </div>
        </div>
      ) : (
        <div>
          {guestBooks.map((guestBook) => (
            <GuestBookCard
              key={guestBook.guestbook_id}
              guestBook={guestBook}
              invitationId={invitationId}
              isCreatePage={isCreatePage}
              thisPage={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          ))}
        </div>
      )}

      {totalPages > 0 && (
        <GuestBookPagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          rgbaColor={rgbaColor}
        />
      )}
    </div>
  );
};

export default GuestBook;
