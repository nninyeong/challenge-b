'use client';

import { useState } from 'react';
import useAddGuestBookEntry from '@/hooks/modals/useAddGuestBookEntry';

const CreateGuestBookModal: React.FC<{ invitationId: string; onClick: () => void }> = ({ invitationId, onClick }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const { mutate: addGuestBookEntry } = useAddGuestBookEntry(invitationId, onClick);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !password || !message) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    addGuestBookEntry({ name, password, content: message });
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
        <form onSubmit={handleSubmit}>
          <label className='flex gap-3'>
            이름
            <div>
              <input
                type='text'
                className='border-gray-500 border outline-none col-span-2 p-1'
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>
          <textarea
            className='border-gray-500 border outline-none col-span-2 p-1'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type='submit'>작성하기</button>
        </form>
      </div>
    </div>
  );
};

export default CreateGuestBookModal;
