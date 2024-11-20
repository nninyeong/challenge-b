import TogglePrivate from './TogglePrivate';

const SetPrivateInvitation = () => {
  return (
    <div className='desktop:w-[448px] desktop:h-[78px] desktop:text-[20px] flex justify-between items-center gap-8 desktop:pt-[27px] desktop:pb-[27px] desktop:pl-[24px] desktop:pr-[24px] bg-gray-100 rounded-[12px] text-[16px] text-gray-700 font-bold w-[343px] h-[62px] pl-[16px] pr-[16px]'>
      <p>내 청첩장 공개하기 ON/OFF</p>
      <TogglePrivate />
    </div>
  );
};

export default SetPrivateInvitation;
