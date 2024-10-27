'use client';

import { useState } from 'react';
import useDeleteGuestBookEntry from '@/hooks/modals/useDeleteGuestBookEntry';

const CreateGuestBook: React.FC<{
  invitationId: string;
  id: string | null;
  signedPassword: string | null;
  onClick: () => void;
}> = ({ invitationId, id, signedPassword, onClick }) => {
  const [password, setPassword] = useState('');
  const { mutate: deleteGuestBookEntry } = useDeleteGuestBookEntry(invitationId, id, signedPassword, onClick);

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
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/80'>
      <div className='bg-white text-black w-[350px] h-auto p-4 rounded-md'>
        <div
          className='cursor-pointer'
          onClick={onClick}
        >
          X {/* 나중에 아이콘으로 변경 필요 */}
        </div>
        <form onSubmit={handleGuestBookDelete}>
          <label className='flex gap-3'>
            비밀번호
            <div>
              <input
                type='password'
                className='border-gray-500 border outline-none col-span-2 p-1'
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </label>
          <button>삭제하기</button>
        </form>
      </div>
    </div>
  );
};

export default CreateGuestBook;
