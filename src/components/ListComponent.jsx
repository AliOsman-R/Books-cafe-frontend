import React, { useContext, useEffect, useState } from 'react';
import { AppLoader } from './LoaderSpinner';
import Pagination from './Pagination';
import Filter from './Filter';
import Search from './Search';
import Sorting from './Sorting';
import { setPagination } from '../utils/AppUtils';
import { CgUnavailable } from 'react-icons/cg';
import { PrimaryButton } from './buttons';
import { Container, PrimaryInput } from './inputs';
import { Context } from '../context/GlobalContext';
import Map from '../components/Map';


const ListComponent = ({ cafe, type, items , filteredItems, setFilteredItems, pageLoading, CardComponent, nearCafes, handleClcik }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(6);
  const {maxDistance, actions} = useContext(Context)
  const isEventSOrCafes = type === 'events' || type === 'cafes'
  const isData = filteredItems.length > 0;

  const handleSearch = (e, setSearchQuery) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredData = items.filter(item =>
      Object.keys(item).some(key =>
        typeof item[key] === 'string' && item[key].toLowerCase().includes(query)
      )
    );
    setFilteredItems(filteredData);
  };

  useEffect(() => {
    if(!isEventSOrCafes)
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
      <div className={`flex ${type !== 'event'? 'justify-between' : 'justify-end'} ${isEventSOrCafes? 'py-6 border-b border-gray-300 ssm:flex-col md:flex-row items-center' : ''} items-center`}>
        {type !== 'event' && !isEventSOrCafes && (
          <div className='w-[25%]'>
            <Sorting context={type} items={items} setData={setFilteredItems} />
          </div>
        )}
        {isEventSOrCafes && 
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {type === 'events'? 'Welcome to Cafes Events' : 'Welcome to Your Cafes Oasis'}
              </h1>
              <p className="text-gray-500">
                {type === 'events'? "Explore the all cafes' events here" : 'Explore the Best Cafes Near You'}
              </p>
            </div>
        }
        <Search handleSearch={handleSearch} />
      </div>
      <div className="flex flex-grow min-h-[875px]">
        <div className="ssm:hidden md:flex md:flex-col">
          {type === 'cafes' &&
            <div className="w-full">
              <Map cafes={filteredItems}/>
            </div>
          }
          <Filter filteredItems={filteredItems} />
        </div>
        <div className="flex-1 flex flex-wrap justify-center">
          {isData ? ( 
             setPagination(recordsPerPage, currentPage, filteredItems).map(item => (
              <div key={item._id}>
                <CardComponent key={item._id} item={item} cafe={cafe} type={type} />
              </div>
              ))
          ): (
            <div className="flex flex-col justify-center items-center mb-[100px]">
              <h1 className="text-[40px] font-semibold text-gray-400">
                We are sorry
              </h1>
              {!nearCafes &&
              <h1 className="text-[40px] font-semibold text-gray-400 flex gap-2 items-center">
                No {type? type : 'events'} Available{" "}
                <CgUnavailable size={50} className="text-gray-400" />
              </h1>
              } 
              {nearCafes && 
              <h1 className="text-[40px] font-semibold text-gray-400 flex flex-col gap-2 items-center">
                <div className="flex items-center">
                  No cafes near to you {" "}
                  <CgUnavailable size={50} className="text-gray-400 mt-2" />
                </div>
                <div className="flex flex-col gap-5 justify-center">
                <div className="flex items-center justify-center gap-5 ">
                  <div className="flex items-center gap-3">
                    <span className='text-[20px]'>Max Distance:(in meter)</span>
                    <PrimaryInput type="number" value={maxDistance} onChange={(e) => actions({type:'SET_MAX_DISTANCE', payload:parseFloat(e.target.value)})} />
                  </div>
                  <PrimaryButton className='h-[30px]' onClick={() => handleClcik('near')}>Search</PrimaryButton>
                </div>
                <div className="flex justify-center items-center">
                  <PrimaryButton className='h-[30px] w-[50%] mt-2' onClick={() => handleClcik('all')}>Get all cafes</PrimaryButton>
                </div>
                </div>
              </h1>
              }
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
          data={filteredItems}
        />
      </div>
    </div>
  );
}

export default ListComponent;

