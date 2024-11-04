'use client';

import useGuestBookEntries from '@/hooks/guestbook/useGuestBookEntries';
import CreateGuestBook from './CreateGuestBook';
import GuestBookCard from './GuestBookCard';
import useInvitationIdByPathname from '@/hooks/invitation/useInvitationIdByPathname';
import { useState } from 'react';

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
      <div className='text-center mb-6 tracking-[4px]'>GUEST BOOK</div>
      <CreateGuestBook invitationId={invitationId} />

      <div>
        {guestBooks.map((guestBook) => (
          <GuestBookCard
            key={guestBook.guestbook_id}
            guestBook={guestBook}
            invitationId={invitationId}
          />
        ))}
      </div>

      <div className='w-full px-4 mt-6 mb-20'>
        <div className='h-10 px-1 bg-primary300 flex justify-between items-center rounded-full'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setPage(index + 1)}
              className={`w-8 h-8 px-2  rounded-full text-[20px] ${page === index + 1 ? 'bg-white text-primary300' : 'text-white'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestBook;
