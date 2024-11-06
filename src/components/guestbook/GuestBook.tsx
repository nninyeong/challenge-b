'use client';

import useGuestBookEntries from '@/hooks/guestbook/useGuestBookEntries';
import CreateGuestBook from './CreateGuestBook';
import GuestBookCard from './GuestBookCard';
import useInvitationIdByPathname from '@/hooks/invitation/useInvitationIdByPathname';
import { useState } from 'react';
import GuestBookPagination from './GuestBookPagination';

const ITEMS_PER_PAGE = 6;

const GuestBook = () => {
  const { invitationId } = useInvitationIdByPathname();
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGuestBookEntries(invitationId, page);
  const guestBooks = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  if (isLoading) return <div>방명록을 로딩중입니다...</div>;
  if (error) return <div>방명록을 불러오는 중 에러가 발생하였습니다.</div>;

  return (
    <div>
      <div className='text-gray-600 text-center mb-6 tracking-[4px]'>GUEST BOOK</div>
      <CreateGuestBook invitationId={invitationId} />

      {guestBooks.length === 0 ? (
        <div className='text-black w-full px-4 mb-4'>
          <div className='bg-gray-50 rounded-xl px-4 h-[83px] flex justify-center items-center'>
            방명록에 첫 게시글을 남겨주세요.
          </div>
        </div>
      ) : (
        <div>
          {guestBooks.map((guestBook) => (
            <GuestBookCard
              key={guestBook.guestbook_id}
              guestBook={guestBook}
              invitationId={invitationId}
            />
          ))}
        </div>
      )}

      
      {totalPages > 0 && (
        <div className='w-full px-4 mt-6 mb-6'>
          <GuestBookPagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default GuestBook;
