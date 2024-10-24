import useGuestBookDeleteButton from '@/hooks/modals/useGuestBookDeleteButton';
import DeleteGuestBookModal from '@/app/components/DeleteGuestBookModal';
import { GuestBookEntry } from '@/types/guestBookEntry.types';

const GuestBookCard = ({ guestBook, invitationId }: { guestBook: GuestBookEntry; invitationId: string }) => {
  const { showDeleteModal, handleDeleteModalClick } = useGuestBookDeleteButton();

  return (
    <div className='bg-red-100'>
      <div>
        <span onClick={handleDeleteModalClick}>x</span>
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
