'use client';

const ReviewWriteButton = ({
  setOpenBottomSheet,
}: {
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      className='fixed bottom-[13px] left-1/2 rounded-[300px] bg-primary300 
    text-white flex justify-center items-center w-[142px] h-[40px] -translate-x-1/2
    '
      onClick={() => setOpenBottomSheet(true)}
    >
      <img
        src='/assets/images/icons/white-edit-contained-selceted.svg'
        alt='후기 작성 열기'
      />
      <p className='font-bold text-[16px] leading-[120%] tracking-[-0.032px]'>후기 작성 열기</p>
    </button>
  );
};

export default ReviewWriteButton;
