'use client';

import useGuestBookEntries from '@/hooks/guestbook/useGuestBookEntries';
import CreateGuestBook from './CreateGuestBook';
import GuestBookCard from './GuestBookCard';
import useInvitationIdByPathname from '@/hooks/invitation/useInvitationIdByPathname';

const GuestBook = () => {
  const { invitationId } = useInvitationIdByPathname();
  const { data: guestBooks = [], isLoading, error } = useGuestBookEntries(invitationId);
  if (isLoading) return <div>방명록을 로딩중입니다...</div>;
  if (error) return <div>방명록을 불러오는 중 에러가 발생하였습니다.</div>;

  return (
    <div>
      <div className='text-gray-600 text-center tracking-[4px] mb-6'>GUEST BOOK</div>
      <CreateGuestBook invitationId={invitationId}/>
      <div className='mt-14'>
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
