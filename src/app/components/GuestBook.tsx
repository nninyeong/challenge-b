'use client';

import useGuestBookButton from '@/hooks/modals/useGuestBookButton';
import CreateGuestBook from './CreateGuestBook';

const GuestBook = () => {
  const { showCreateModal, handleCreateModalClick } = useGuestBookButton();
  const invitationId = '4cf95008-dd98-4810-875b-354cd38a6505'; // 추후 청첩장 id를 넣는 방식으로 변경

  return (
    <div>
      <div>GuestBook</div>
      <div>방명록</div>
      <div>각 열 하나씩 출력 예정</div>
      <div
        className='cursor-pointer'
        onClick={handleCreateModalClick}
      >
        작성하기
      </div>
      {showCreateModal && (
        <CreateGuestBook
          invitationId={invitationId}
          onClick={handleCreateModalClick}
        />
      )}
    </div>
  );
};

export default GuestBook;
