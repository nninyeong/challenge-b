'use client';

import browserClient from '@/utils/supabase/client';
import { useState } from 'react';

const CreateGuestBook: React.FC<{ id: string | null; signedPassword: string | null; onClick: () => void }> = ({
  id,
  signedPassword,
  onClick,
}) => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleGuestBookDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id !== null && password === signedPassword) {
      const { error } = await browserClient.from('guestbook').delete().eq('guestbook_id', id);

      if (error) {
        console.error('Error inserting data:', error);
        alert('방명록을 삭제하는 중 오류가 발생했습니다.');
      } else {
        alert('방명록이 삭제되었습니다.');
        onClick();
      }
    } else {
      alert('패스워드가 일치하지 않습니다');
    }
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/80'>
      <div className='bg-white text-black w-[350px] h-auto p-4 rounded-md'>
        <div
          className='cursor-pointer'
          onClick={onClick}
        >
          X
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
