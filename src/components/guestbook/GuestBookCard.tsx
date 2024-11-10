'use client';

import { GuestBookEntry } from '@/types/guestBookEntry.types';
import DeleteGuestBookAccordion from '@/components/guestbook/DeleteGuestBookAccordion';
import useGuestBookDeleteButton from '@/hooks/guestbook/useGuestBookDeleteButton';
import convertToUserTimezone from '@/utils/date/dayToKst';
import { useFontStore } from '@/store/useFontStore';
const GuestBookCard = ({ guestBook, invitationId }: { guestBook: GuestBookEntry; invitationId: string }) => {
  const { isAccordionOpen, toggleAccordion } = useGuestBookDeleteButton();
  const { year, month, day, hour, minute } = convertToUserTimezone(guestBook.created_at);
  const fontSize = useFontStore((state) => state.fontSize);
  return (
    <div
      style={{ fontSize: `${16 + fontSize}px` }}
      className='text-black w-full px-4 mb-4'
    >
      <div className='bg-gray-50 rounded-xl px-4'>
        <div className='flex justify-between pt-4'>
          <div className='text-gray-900 font-bold'>{guestBook.name}</div>
          <div className='flex items-center gap-1'>
            <div
              style={{ fontSize: `${12 + fontSize}px` }}
              className='text-[12px] text-gray-300'
            >{`${year}-${month}-${day} ${hour}:${minute}`}</div>
            <img
              src='/assets/images/icons/x-03-gray.svg'
              alt='x'
              className='w-[24px] h-[24px]'
              onClick={toggleAccordion}
            />
          </div>
        </div>
        <div className='text-gray-700 mt-[5px] mb-[14px] break-words whitespace-pre-wrap'>{guestBook.content}</div>
        <div
          className={`transition-[max-height] duration-300 overflow-hidden ${isAccordionOpen ? 'max-h-[300px]' : 'max-h-0'}`}
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
    </div>
  );
};

export default GuestBookCard;
