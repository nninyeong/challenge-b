import { Dispatch, SetStateAction } from 'react';

const GuestBookPagination = ({
  page,
  setPage,
  totalPages,
  rgbaColor,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  rgbaColor: string;
}) => {
  const getPaginationRange = () => {
    const range: (string | number)[] = [];
    const maxButtons = 9;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      if (page <= 5) {
        range.push(...[1, 2, 3, 4, 5, 6, 7, '...', totalPages]);
      } else if (page >= totalPages - 4) {
        range.push(
          ...[
            1,
            '...',
            totalPages - 6,
            totalPages - 5,
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
          ],
        );
      } else {
        range.push(...[1, '...', page - 2, page - 1, page, page + 1, page + 2, '...', totalPages]);
      }
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <div
      style={{
        color: `${rgbaColor}`,
      }}
      className='mx-4 mt-6 mb-6 flex justify-center items-center'
    >
      <div
        style={{
          border: `2px solid ${rgbaColor}`,
        }}
        className='flex justify-center items-center gap-[6px] px-1 h-10 rounded-full'
      >
        {paginationRange.map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => typeof pageNumber === 'number' && setPage(pageNumber)}
            disabled={pageNumber === '...' || (typeof pageNumber === 'number' && pageNumber > totalPages)}
            className={`w-8 h-8 rounded-full text-[16px] flex items-center justify-center
              ${page === pageNumber ? 'text-[20px] font-bold' : 'font-medium opacity-70'}
            `}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GuestBookPagination;
