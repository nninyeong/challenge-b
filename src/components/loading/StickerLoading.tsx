export const StickerLoading = () => {
  return (
    <div className='grid grid-cols-4 gap-4 h-[150px] overflow-hidden'>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className='w-[71px] h-[71px] bg-gray-50 animate-pulse rounded-lg'
        />
      ))}
    </div>
  );
};
