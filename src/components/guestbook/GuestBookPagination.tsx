import { Dispatch, SetStateAction } from 'react';

const GuestBookPagination = ({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}) => {
  return (
    <div className='h-10 px-1 bg-primary300 flex justify-between items-center rounded-full'>
      {Array.from({ length: 9 }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setPage(index + 1)}
          disabled={index + 1 > totalPages}
          className={`w-8 h-8 px-2 rounded-full text-[16px] 
          ${page === index + 1 ? 'bg-white text-primary300 text-[20px]' : 'text-white'}
          ${index + 1 > totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default GuestBookPagination;
