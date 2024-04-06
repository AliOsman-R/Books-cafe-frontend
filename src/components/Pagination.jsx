import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Pagination = ({ currentPage, setCurrentPage, recordsPerPage, setRecordsPerPage, data}) => {
  const numberOfPages = Math.ceil(data.length/recordsPerPage)
  let pages = [];
  if (numberOfPages <= 5) {
    pages = [...Array(numberOfPages).keys()].map(n => n + 1);
  } else {
    pages.push(1);

    let start = Math.max(currentPage - 2, 2);
    let end = Math.min(start + 3, numberOfPages - 1);

    if (currentPage >= numberOfPages - 2) {
      start = numberOfPages - 4;
      end = numberOfPages - 1;
    }

    if (start > 2) {
      pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < numberOfPages - 1) {
      pages.push('...');
    }

    pages.push(numberOfPages);
  }

  const handleClick = (e,n) => {
    window.scrollTo(0, 0);
    const {name} = e.target;
    if(name === 'prev')
        setCurrentPage(currentPage - 1)
    else if (name === 'n')
        setCurrentPage(n)
    else
        setCurrentPage(currentPage + 1)
  }
useEffect(() => {
 if(currentPage > pages.length)
 {
  setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
 }
}, [recordsPerPage])

console.log(numberOfPages,currentPage)

  return (
    <div className="flex gap-3 items-center">
       <select
        value={recordsPerPage}
        onChange={(e) => setRecordsPerPage(parseInt(e.target.value))}
        className="md:px-2 md:py-1 ssm:py-[1px] ssm:px-[2px] border border-gray-300 rounded-md bg-white text-gray-700 shadow-sm focus:outline-none focus:border-primaryColor"
        >
            <option value={6}>6</option>
            <option value={9}>9</option>
        </select>
        <div className="flex justify-center items-center gap-1 md:gap-2">
        <PaginationButton name={'prev'} onClick={handleClick} disabled={currentPage === 1}>
            Prev
        </PaginationButton>
        {pages.map(n => (
            <PaginationButton
            name={'n'}
            key={uuidv4()}
            onClick={(e) => n !== '...' && handleClick(e,n)}
            disabled={n === '...'}
            isActive={currentPage === n}
            >
            {n}
            </PaginationButton>
        ))}
        <PaginationButton name={'next'} onClick={handleClick} disabled={currentPage === numberOfPages || numberOfPages === 0}>
            Next
        </PaginationButton>
        </div>

    </div>
  );
};

const PaginationButton = ({ children, onClick, disabled, isActive, name }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      name={name}
      className={`px-2 md:px-4 min-w-[27px] sm:w-[50px] md:w-[65px] text-center py-1 text-xs md:text-sm ${isActive ? 'bg-primaryColor text-white' : 'bg-white text-gray-700'} border rounded-md hover:bg-primaryColorHover hover:text-white disabled:opacity-50`}
    >
      {children}
    </button>
  );

export default Pagination;



