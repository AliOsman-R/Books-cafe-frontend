import React, { useEffect, useState } from 'react';
import { AppLoader } from './LoaderSpinner';
import Pagination from './Pagination';
import Filter from './Filter';
import { setPagination } from '../utils/AppUtils';
import { v4 as uuidv4 } from 'uuid';
import { CgUnavailable } from 'react-icons/cg';


const ListComponent = ({ cafe, type, items , filteredItems, setFilteredItems, pageLoading, CardComponent }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(6);
  const [originalCurrentPage, setOriginalCurrentPage] = useState(1)
  const isEvents = type === 'events'
  const isData = filteredItems.length > 0;

  useEffect(() => {
    if(!isEvents)
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    }
  }, []);

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <AppLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 ">
      <div className={`flex ${type !== 'event'? 'justify-between' : 'justify-end'} ${isEvents? 'py-6 border-b border-gray-300 ssm:flex-col md:flex-row items-center' : ''} items-center`}>
        {isEvents && 
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {type === 'events'? 'Welcome to Cafes Events' : 'Welcome to Your Cafes Oasis'}
              </h1>
              <p className="text-gray-500">
                {type === 'events'? "Explore the all cafes' events here" : 'Explore the Best Cafes Near You'}
              </p>
            </div>
        }
      </div>
      <div className="flex flex-grow min-h-[875px]">
        <div className="ssm:hidden md:flex md:flex-col p-[16px]">
          <Filter 
          items={items} 
          setFilteredItems={setFilteredItems} 
          type={type === 'event'? 'events' : type} 
          setCurrentPage={setCurrentPage} 
          originalCurrentPage={originalCurrentPage} 
          />
        </div>
        <div className="flex-1 flex flex-wrap justify-center">
          {isData ? ( 
             setPagination(recordsPerPage, currentPage, filteredItems).map(item => (
              <div key={uuidv4()}>
                <CardComponent key={item._id} item={item} cafe={cafe} type={type} />
              </div>
              ))
          ): (
            <div className="flex flex-col justify-center items-center mb-[100px]">
              <h1 className="text-[40px] font-semibold text-gray-400">
                We are sorry
              </h1>
              <h1 className="text-[40px] font-semibold text-gray-400 flex gap-2 items-center">
                No {type? type : 'events'} Available{" "}
                <CgUnavailable size={50} className="text-gray-400" />
              </h1>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center space-x-2 my-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          recordsPerPage={recordsPerPage}
          setRecordsPerPage={setRecordsPerPage}
          setOriginalCurrentPage={setOriginalCurrentPage}
          data={filteredItems}
        />
      </div>
    </div>
  );
}

export default ListComponent;

