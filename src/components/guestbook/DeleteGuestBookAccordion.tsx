'use client';

import useDeleteGuestBookEntry from '@/hooks/modals/useDeleteGuestBookEntry';
import { useState } from 'react';

const DeleteGuestBookAccordion = ({
  invitationId,
  id,
  signedPassword,
  onClose,
}: {
  invitationId: string;
  id: string | null;
  signedPassword: string | null;
  onClose: () => void;
}) => {
  const [password, setPassword] = useState('');
  const { mutate: deleteGuestBookEntry } = useDeleteGuestBookEntry(invitationId, id, signedPassword, onClose);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleGuestBookDelete = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      alert('패스워드를 입력해주세요.');
      return;
    }
    
    deleteGuestBookEntry(password);
  };

  return (
    <div className='p-4 bg-white text-black border rounded-md mt-2'>
      <form onSubmit={handleGuestBookDelete}>
        <label className='flex gap-3'>
          비밀번호
          <input
            type='password'
            className='border-gray-500 border outline-none p-1'
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type='submit'>삭제하기</button>
      </form>
    </div>
  );
};

export default DeleteGuestBookAccordion;
