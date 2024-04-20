import React, { useEffect, useState } from 'react';

const Sorting = ({ context, books, menu, setData  }) => {
    const [selection, setSelection] = useState('All');

    useEffect(() => {
        let results = [];
        if (selection === 'All') {
            results = context === 'books' ? books : menu;
        } else {
            results = context === 'books' 
                ? books.filter(book => book.genre === selection)
                : menu.filter(item => item.type === selection);
        }
        setData(results);
    }, [selection, books, menu, context, setData]);

    const options = context === 'books'
        ? [...new Set(books.map(book => book.genre))]
        : [...new Set(menu.map(item => item.type))];

    return (
        <div className="container p-4">
            <div>
                <label htmlFor="select" className="block text-sm font-medium text-gray-700">
                    Select {context === 'books' ? 'Genre' : 'Type'}:
                </label>
                <select
                    id="select"
                    value={selection}
                    onChange={e => setSelection(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
                >
                    <option value="All">All {context === 'books' ? 'Genres' : 'Types'}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Sorting;
