import React, { useContext, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { PrimaryInput } from './inputs';
import { PrimaryButton } from './buttons';
import { Context } from '../context/GlobalContext';
import { states } from '../data/data';
import StarRating from './StarRating';
import { getDayInfo } from '../utils/AppUtils';
import { v4 as uuidv4 } from 'uuid';

const Filter = ({items, setFilteredItems, type, setCurrentPage, originalCurrentPage }) => {
  const [rating, setRating] = useState(0);
  const [search, setSearch] = useState('');
  const [selection, setSelection] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [status, setStatus] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const isEvent = type === 'events' 

  const clearFilters = () => {
    setRating(0);
    setSearch('');
    setSelection('All');
    setMinPrice('');
    setMaxPrice('');
    setStatus('All');
    setStartDate('');
    setEndDate('');
    setFilteredItems(items);
  };

  useEffect(() => {
    applyFilter();
  }, [rating, search, selection, minPrice, maxPrice, status,  startDate, endDate]);

  const applyFilter = () => {
    let filteredItems = [...items];

    if (search) {
      filteredItems = filteredItems.filter(item =>
        Object.keys(item).some(key =>
          typeof item[key] === 'string' && item[key].toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    if (rating >= 0 && !isEvent) {
      filteredItems = filteredItems.filter(item => item.averageRating >= rating);
    }

    if (selection !== 'All') {
      filteredItems = type === 'books'
        ? filteredItems.filter(book => book.genre === selection)
        : filteredItems.filter(item => item.type === selection);
    }
    
    if (minPrice !== '') {
      filteredItems = filteredItems.filter(item => item.price >= parseFloat(minPrice));
    }

    if (maxPrice !== '') {
      filteredItems = filteredItems.filter(item => item.price <= parseFloat(maxPrice));
    }

    if (status !== 'All') {
      filteredItems = filteredItems.filter(item => item.status === status);
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredItems = filteredItems.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
      });
    }
    setFilteredItems(filteredItems);

    if(filteredItems.length > 0){
      setCurrentPage(1)
    }
    
    if(!search && rating === 0 && !isEvent && selection === 'All' && minPrice === '' && maxPrice === '' && status === 'All' && !startDate && !endDate){
      setCurrentPage(originalCurrentPage)
    }

  };

  const options = type === 'books'
    ? [...new Set(items.map(book => book.genre))]
    : [...new Set(items.map(item => item.type))];

  return (
    <div className="bg-white shadow-lg w-[370px] h-[650px]">
      <div className="p-2 flex flex-col justify-between gap-3 h-full">
        <div className="flex flex-col gap-4 justify-center">
          <div className="flex justify-between">
            <h1 className="font-semibold text-xl">{type?.charAt(0).toUpperCase() + type.slice(1).toLowerCase()} Filter</h1>
          </div>
          <PrimaryInput
            className="h-[40px]"
            type="text"
            value={search}
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          {!isEvent &&
          <>
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
              <StarRating rating={rating} />
            </div>

            <label htmlFor="select" className="text-[17px]">Select {type === 'books' ? 'Genre' : 'Type'}:</label>
            <select
              id="select"
              value={selection}
              onChange={e => setSelection(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="All">All {type === 'books' ? 'Genres' : 'Types'}</option>
              {options.map(option => (
                <option key={uuidv4()} value={option}>{option}</option>
              ))}
            </select>

            <label htmlFor="status" className="text-[17px]">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Not Available">Out of Stock</option>
            </select>

            <label htmlFor="minPrice" className="text-[17px]">Min Price:</label>
            <PrimaryInput
              className="h-[40px]"
              type="number"
              value={minPrice}
              placeholder="Min Price"
              onChange={(e) => setMinPrice(e.target.value)}
            />

            <label htmlFor="maxPrice" className="text-[17px]">Max Price:</label>
            <PrimaryInput
              className="h-[40px]"
              type="number"
              value={maxPrice}
              placeholder="Max Price"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </>}

          {isEvent &&
            <>
              <label htmlFor="startDate" className="text-[17px]">Start Date:</label>
              <PrimaryInput
                className="h-[40px]"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <label htmlFor="endDate" className="text-[17px]">End Date:</label>
              <PrimaryInput
                className="h-[40px]"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </>}
        </div>
        <PrimaryButton className="h-[24px]" onClick={clearFilters}>Clear Filters</PrimaryButton>
      </div>
    </div>
  );
};

export default Filter;
