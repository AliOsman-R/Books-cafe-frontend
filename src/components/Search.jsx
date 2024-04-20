import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

const Search = ({ handleSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="flex items-center md:w-[400px] ssm:w-full bg-[#dbdada] rounded-full shadow-md p-2">
            <IoIosSearch className="text-gray-500" size={30} />
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e, setSearchQuery)}
                className="ml-2 w-full bg-transparent focus:outline-none"
                placeholder="Search..."
            />
        </div>
    );
};

export default Search;
