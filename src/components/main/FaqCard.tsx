const FaqCard = ({ answer }: { answer: string }) => {
  return (
    <div className='text-gray-800 text-[12px] desktop:text-[14px] bg-gray-50 w-full p-4'>
      <div className='flex gap-4'>
        <div className='w-[40px] h-[40px] relative flex-shrink-0'>
          <img
            src='/assets/images/branding/3D-logo-with-text.png'
            alt='드림카드'
            className='w-[40px] h-[40px]'
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
