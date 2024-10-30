'use client';
import { getInvitationCard, patchPrivateInvitation } from '@/utils/myPage';
import { useEffect, useState } from 'react';

const TogglePrivate = () => {
  const [isPrivate, setIsPrivate] = useState(false);

  const toggleSwitch = async ({}) => {
    const newIsPrivate = !isPrivate;
    setIsPrivate(newIsPrivate);
    await patchPrivateInvitation(newIsPrivate);
  };

  const checkPrivate = async () => {
    const data = await getInvitationCard();
    if (!data || data.length === 0) {
      setIsPrivate(false);
      return;
    }
    console.log(data);
    const userPrivate = data[0].isPrivate;
    setIsPrivate(userPrivate);
  };
  useEffect(() => {
    checkPrivate();
  }, []);
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

export default TogglePrivate;
