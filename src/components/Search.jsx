import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

const Search = ({ data, setFilteredData }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filteredData = data.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.ownerName.toLowerCase().includes(query.toLowerCase())||
            item.state.toLowerCase().includes(query.toLowerCase()) ||
            item.city.toLowerCase().includes(query.toLowerCase()) 
        );
        setFilteredData(filteredData);
    };
    return (
        <div className="flex items-center  w-[400px] bg-white rounded-lg shadow-md p-2">
            <IoIosSearch className="text-gray-500" size={30} />
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                className="ml-2 w-full bg-transparent focus:outline-none"
                placeholder="Search..."
            />
        </div>
    );
};

export default Search;
