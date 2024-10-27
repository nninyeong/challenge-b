'use client';

import { useState } from 'react';
import useAddGuestBookEntry from '@/hooks/modals/useAddGuestBookEntry';

const CreateGuestBook: React.FC<{ invitationId: string }> = ({ invitationId }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const resetInput = () => {
    setName('');
    setPassword('');
    setMessage('');
  };

  const { mutate: addGuestBookEntry } = useAddGuestBookEntry({ invitationId, resetInput });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !password || !message) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    addGuestBookEntry({ name, password, content: message });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='w-full px-4 mb-2'>
          <input
            type='text'
            className='border-gray-500 border outline-none col-span-2 p-1 w-full'
            value={name}
            placeholder='이름'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='w-full px-4 mb-2'>
          <input
            type='password'
            className='border-gray-500 border outline-none col-span-2 p-1 w-full'
            value={password}
            placeholder='비밀번호'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='w-full px-4 mb-2'>
          <input
            type='text'
            className='border-gray-500 border outline-none col-span-2 p-1 w-full'
            value={message}
            placeholder='축하메세지'
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button className='w-full px-4' type='submit'>작성하기</button>
      </form>
    </div>
  );
};

export default CreateGuestBook;
