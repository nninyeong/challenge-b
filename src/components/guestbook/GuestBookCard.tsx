'use client';

import { GuestBookEntry } from '@/types/guestBookEntry.types';
import DeleteGuestBookAccordion from '@/components/guestbook/DeleteGuestBookAccordion';
import useGuestBookDeleteButton from '@/hooks/guestbook/useGuestBookDeleteButton';

const GuestBookCard = ({ guestBook, invitationId }: { guestBook: GuestBookEntry; invitationId: string }) => {
  const { isAccordionOpen, toggleAccordion } = useGuestBookDeleteButton();

  return (
    <div className='border text-black w-full px-4'>
      <div>
        <span onClick={toggleAccordion}>x {/* @TODO 나중에 아이콘으로 변경 필요 */}</span>
      </div>
      <div>{guestBook.name}</div>
      <div className='break-words whitespace-pre-wrap'>{guestBook.content}</div>
      <div
        className={`transition-[max-height] duration-300 overflow-hidden ${isAccordionOpen ? 'max-h-[200px]' : 'max-h-0'}`}
      >
        {isAccordionOpen && (
          <DeleteGuestBookAccordion
            invitationId={invitationId}
            id={guestBook.guestbook_id}
            signedPassword={guestBook.password}
            onClose={toggleAccordion}
          />
        )}
      </div>
    </div>
  );
};

export default GuestBookCard;
