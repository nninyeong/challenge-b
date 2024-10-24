'use client';

import useGuestBookButton from '@/hooks/modals/useGuestBookButton';
import CreateGuestBookModal from './CreateGuestBookModal';
import browserClient from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import GuestBookCard from './GuestBookCard';

export type GuestBookEntry = {
  content: string | null;
  created_at: string;
  guestbook_id: string;
  invitation_id: string;
  name: string | null;
  password: string | null;
};

const GuestBook = () => {
  const [guestBooks, setGuestBooks] = useState<GuestBookEntry[]>([]);
  const { showCreateModal, handleCreateModalClick } = useGuestBookButton();
  const invitationId = '4cf95008-dd98-4810-875b-354cd38a6505'; // 추후 청첩장 id를 넣는 방식으로 변경

  const getGuestBook = async (): Promise<GuestBookEntry[]> => {
    const { data, error } = await browserClient.from('guestbook').select('*').eq('invitation_id', invitationId);

    if (error) {
      console.error('Error fetching guest book:', error);
      return [];
    }

    return data as GuestBookEntry[];
  };

  useEffect(() => {
    const fetchGuestBook = async () => {
      const bookData = await getGuestBook();
      console.log(bookData);
      setGuestBooks(bookData);
    };
    fetchGuestBook();
  }, []);

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
