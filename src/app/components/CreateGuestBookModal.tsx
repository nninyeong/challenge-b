'use client';

import browserClient from '@/utils/supabase/client';
import { useState } from 'react';

const CreateGuestBook: React.FC<{ invitationId: string; onClick: () => void }> = ({ invitationId, onClick }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleGuestBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !password || !message) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    const { error } = await browserClient.from('guestbook').insert([
      {
        invitation_id: invitationId,
        name: name,
        password: password,
        content: message,
      },
    ]);

    if (error) {
      console.error('Error inserting data:', error);
      alert('방명록을 저장하는 중 오류가 발생했습니다.');
    } else {
      alert('방명록이 저장되었습니다.');
      onClick();
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
        <form onSubmit={handleGuestBookSubmit}>
          <label className='flex gap-3'>
            이름
            <div>
              <input
                type='text'
                className='border-gray-500 border outline-none col-span-2 p-1'
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </label>
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
          <textarea
            className='border-gray-500 border outline-none col-span-2 p-1'
            value={message}
            onChange={handleMessageChange}
          />
          <button>작성하기</button>
        </form>
      </div>
    </div>
  );
};

export default CreateGuestBook;
