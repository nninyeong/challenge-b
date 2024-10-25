'use client';

import useGuestBookEntries from '@/hooks/modals/useGuestBookEntries';
import useGuestBookButton from '@/hooks/modals/useGuestBookButton';
import CreateGuestBookModal from './CreateGuestBookModal';
import GuestBookCard from './GuestBookCard';

const GuestBook = () => {
  const { showCreateModal, handleCreateModalClick } = useGuestBookButton();
  const invitationId = '4cf95008-dd98-4810-875b-354cd38a6505'; // 추후 청첩장 id를 넣는 방식으로 변경

  const { data: guestBooks = [], isLoading, error } = useGuestBookEntries(invitationId);

  if (isLoading) return <div>방명록을 로딩중입니다...</div>;
  if (error) return <div>방명록을 불러오는 중 에러가 발생하였습니다.</div>;

  return (
    <div>
      <div>GuestBook</div>
      <div>방명록</div>
      <div
        className='cursor-pointer'
        onClick={handleCreateModalClick}
      >
        작성하기
      </div>
      <div>
        {guestBooks.map((guestBook) => (
          <GuestBookCard
            key={guestBook.guestbook_id}
            guestBook={guestBook}
            invitationId={invitationId}
          />
        ))}
      </div>
      {showCreateModal && (
        <CreateGuestBookModal
          invitationId={invitationId}
          onClick={handleCreateModalClick}
        />
      )}
    </div>
  );
};

export default GuestBook;
