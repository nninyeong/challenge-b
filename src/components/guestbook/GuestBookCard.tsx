import useGuestBookDeleteButton from '@/hooks/modals/useGuestBookDeleteButton';
import DeleteGuestBookModal from '@/components/guestbook/DeleteGuestBookModal';
import { GuestBookEntry } from '@/types/guestBookEntry.types';

const GuestBookCard = ({ guestBook, invitationId }: { guestBook: GuestBookEntry; invitationId: string }) => {
  const { showDeleteModal, handleDeleteModalClick } = useGuestBookDeleteButton();

  return (
    <div className='bg-red-100 text-black'>
      <div>
        <span onClick={handleDeleteModalClick}>x  {/* 나중에 아이콘으로 변경 필요 */}</span>
      </div>
      <div>{guestBook.name}</div>
      <div>{guestBook.content}</div>
      {showDeleteModal && (
        <DeleteGuestBookModal
          invitationId={invitationId}
          id={guestBook.guestbook_id}
          signedPassword={guestBook.password}
          onClick={handleDeleteModalClick}
        />
      )}
    </div>
  );
};

export default GuestBookCard;
