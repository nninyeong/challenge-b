import TogglePrivate from './TogglePrivate';

const SetPrivateInvitation = () => {
  return (
    <div className='flex justify-between items-center gap-8 mt-4 p-4 bg-gray-100 rounded text-gray-700 font-bold '>
      <p>내 청첩장 공개하기 ON/OFF</p>
      <TogglePrivate />
    </div>
  );
};

export default SetPrivateInvitation;
