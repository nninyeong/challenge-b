'use client';
import { patchPrivateInvitation } from '@/utils/myPage';
import { useState } from 'react';

const ToggleSwitch = () => {
  const [isPrivate, setIsPrivate] = useState(false);

  const toggleSwitch = async ({}) => {
    setIsPrivate(!isPrivate);
    await patchPrivateInvitation(isPrivate);
  };

  return (
    <div
      onClick={toggleSwitch}
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${isPrivate ? 'bg-primary-300' : 'bg-gray-400'}`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${isPrivate ? 'translate-x-6' : ''}`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
