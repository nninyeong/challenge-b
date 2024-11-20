import { Dispatch, SetStateAction } from "react";

const handlePageClick = (pageNumber: string | number, setPage: Dispatch<SetStateAction<number>>) => {
  if (typeof pageNumber === 'number') {
    setPage(pageNumber);
  }
};

export default handlePageClick;