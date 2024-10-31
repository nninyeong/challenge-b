'use client';

import useGuestBookEntries from '@/hooks/guestbook/useGuestBookEntries';
import CreateGuestBook from './CreateGuestBook';
import GuestBookCard from './GuestBookCard';

const GuestBook = () => {
  const invitationId = '6ae529a2-725d-4e2d-ac26-07bd9e86aa34'; // @TODO 추후 청첩장 id를 넣는 방식으로 변경

  const { data: guestBooks = [], isLoading, error } = useGuestBookEntries(invitationId);

  if (isLoading) return <div>방명록을 로딩중입니다...</div>;
  if (error) return <div>방명록을 불러오는 중 에러가 발생하였습니다.</div>;

  return (
    <div>
      <div className='text-center'>GUEST BOOK</div>
      <CreateGuestBook invitationId={invitationId}/>
      <div>
        {guestBooks.map((guestBook) => (
          <GuestBookCard
            key={guestBook.guestbook_id}
            guestBook={guestBook}
            invitationId={invitationId}
          />
        ))}
      </div>
    </div>
  );
};

export default GuestBook;
