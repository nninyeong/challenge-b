const FaqCard = ({ answer }: { answer: string }) => {
  return (
    <div className='text-gray-800 text-[12px] desktop:text-[20px] font-medium bg-gray-50 w-full pt-4 pb-5 desktop:pt-6 desktop:pb-7'>
      <div className='flex gap-4 desktop:gap-12'>
        <div className='w-[40px] h-[40px] relative flex-shrink-0'>
          <img
            src='/assets/images/branding/3D-logo-with-text.png'
            alt='드림카드'
            className='w-[40px] desktop:w-[60px] h-[40px] desktop:h-[60px]'
            loading='lazy'
          />
        </div>
        <div style={{ width: 'calc(100% - 80px)' }}>
          {answer.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqCard;
