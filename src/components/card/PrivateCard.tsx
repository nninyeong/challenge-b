const PrivateCard = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <img
        src='/assets/images/icons/private-card.webp'
        alt='비공개 청첩장'
        loading='eager'
        width={95}
      />
      <p className='text-[16px] font-medium text-gray-400'>청첩장이 비공개로 설정되어 있습니다.</p>
    </div>
  );
};

export default PrivateCard;
