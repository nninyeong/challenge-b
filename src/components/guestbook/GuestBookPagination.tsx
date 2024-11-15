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
      // If total pages is less than or equal to 9, show all pages
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // Handle ellipsis pagination when totalPages > 9
      if (page <= 5) {
        // Pages near the start
        range.push(...[1, 2, 3, 4, 5, 6, 7, '...', totalPages]);
      } else if (page >= totalPages - 4) {
        // Pages near the end
        range.push(...[1, '...', totalPages - 6, totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]);
      } else {
        // Pages in the middle
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
          disabled={pageNumber === '...'}
          className={`w-8 h-8 rounded-full text-[16px] flex items-center justify-center
            ${page === pageNumber ? 'bg-white text-gray-900 text-[20px]' : 'text-white'}
            ${pageNumber === '...' ? 'cursor-default' : ''}`}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default GuestBookPagination;
