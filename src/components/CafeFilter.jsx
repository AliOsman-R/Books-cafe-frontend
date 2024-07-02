import React, { useContext, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { PrimaryInput } from './inputs';
import { PrimaryButton } from './buttons';
import { Context } from '../context/GlobalContext';
import { states } from '../data/data';
import StarRating from './StarRating';
import { getDayInfo } from '../utils/AppUtils';

const CafeFilter = ({ setOpenFilter, handleClick, cafes, setCafes, setCurrentPage, originalCurrentPage }) => {
  const { maxDistance, actions } = useContext(Context);
  const [rating, setRating] = useState(0);
  const [state, setState] = useState('');
  const [isOpen, setIsOpen] = useState('any');
  const [search, setSearch] = useState('')

  const handleDistanceChange = (type, value) => {
    actions({ type, payload: value });
  };

  const clearFilters = () => {
    setRating(0);
    setState('');
    setIsOpen('any');
    handleDistanceChange('SET_MAX_DISTANCE', parseFloat(2000))
    setCafes(cafes)
  };

  useEffect(() => {
    applyFilter();
  }, [rating, state, isOpen, search]);

  const applyFilter = ( ) => {
    let filteredCafes = [...cafes];

    if(search){
      filteredCafes = filteredCafes.filter(cafe =>
        Object.keys(cafe).some(key =>
          typeof cafe[key] === 'string' && cafe[key].toLowerCase().includes(search)
        )
      );
    }

    if (rating >= 0) {
      filteredCafes = filteredCafes.filter(cafe => cafe.averageRating >= rating);
    }
  
    if (state) {
      filteredCafes = filteredCafes.filter(cafe => cafe.state === state);
    }
  
    if (isOpen !== 'any') {
      filteredCafes = filteredCafes.filter(cafe => {
        if (isOpen === 'open'){
          const dayInfo = getDayInfo(cafe.workingDays);
          return dayInfo.status === 'Open'
        };
        if (isOpen === 'closed'){
          const dayInfo = getDayInfo(cafe.workingDays);
          return dayInfo.status === 'Closed'
        }
      });
    }
    
    setCafes(filteredCafes)

    if(filteredCafes.length > 0){
      setCurrentPage(1)
    }

    if(!search && rating === 0 && !state && isOpen === 'any'){
      setCurrentPage(originalCurrentPage)
    }
  }


  return (
    <div className="bg-white shadow-lg w-[370px] h-[600px]">
      <div className="flex flex-col justify-between h-full gap-3 p-2">
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h1 className="font-semibold text-xl">Cafe Filter</h1>
              <button onClick={() => setOpenFilter(false)} className="p-[4px] rounded-full bg-primaryColor">
                <FiX size={20} color="white" />
              </button>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label htmlFor="maxDistance" className="text-[17px]">Max Distance: (in meters):</label>
              <div className="flex flex-col gap-2 mb-5">
                <div className="flex items-center gap-2">
                  <PrimaryInput
                    className='h-[40px]'
                    type="number"
                    id="maxDistance"
                    value={maxDistance}
                    onChange={(e) => handleDistanceChange('SET_MAX_DISTANCE', parseFloat(e.target.value))}
                  />
                  <PrimaryButton className="h-[20px]" onClick={() => handleClick('near')}>Search</PrimaryButton>
                </div>
                <PrimaryButton className="h-[20px]" onClick={() => handleClick('all')}>Get all cafes</PrimaryButton>  
              </div>

              <PrimaryInput
                className='h-[40px]'
                type="text"
                value={search}
                placeholder='Search...'
                onChange={(e) => setSearch(e.target.value)}
                />

              <label htmlFor="rating" className="text-[17px]">Rating:</label>
              <div className="flex items-center gap-3">
                <select
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(parseFloat(e.target.value))}
                  className="p-2 border rounded w-[70%]"
                >
                  {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(r => (
                    <option key={r} value={r}>{r} star</option>
                  ))}
                </select>
                <StarRating rating={rating}/>
              </div>

              <label htmlFor="state" className="text-[17px]">State:</label>
              <select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">All</option>
                {states.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <label htmlFor="isOpen" className="text-[17px]">Status:</label>
              <select
                id="isOpen"
                value={isOpen}
                onChange={(e) => setIsOpen(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="any">Any</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>

            </div>
        </div>
        <PrimaryButton className="h-[24px] " onClick={clearFilters}>Clear Filters</PrimaryButton>
      </div>
    </div>
  );
};

export default CafeFilter;
