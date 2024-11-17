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
  const getPaginationRange = () => {
    const range: (string | number)[] = [];
    const maxButtons = 9;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= maxButtons; i++) {
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
    <div className='h-10 px-1 bg-gray-600 flex justify-between items-center rounded-full'>
      {paginationRange.map((pageNumber, index) => (
        <button
          key={index}
          onClick={() => typeof pageNumber === 'number' && setPage(pageNumber)}
          disabled={pageNumber === '...' || (typeof pageNumber === 'number' && pageNumber > totalPages)}
          className={`w-8 h-8 rounded-full text-[16px] flex items-center justify-center
            ${page === pageNumber ? 'bg-white text-gray-900 text-[20px]' : 'text-white'}
            ${pageNumber === '...' || (typeof pageNumber === 'number' && pageNumber > totalPages) ? 'cursor-default opacity-50' : ''}`}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default GuestBookPagination;
