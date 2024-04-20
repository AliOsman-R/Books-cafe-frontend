import React, { useState } from 'react';
import BooksList from './BooksList';
import MenuList from './MenuList';
import EventsList from './EventList';

const CafeList = () => {
  const [activeTab, setActiveTab] = useState('books');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Cafe List</h1>
        <p className="text-gray-600">Here you can manage your cafe's books, menu items, and events. Select a category below to get started.</p>
      </div>

      <div className="border-b border-gray-300">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" aria-label="Tabs">
          <li className="mr-2">
            <button
              className={`inline-block py-4 px-6 rounded-t-lg ${
                activeTab === 'books' ? 'text-white bg-primaryColor' : 'text-gray-600 bg-white hover:text-primaryColor'
              }`}
              onClick={() => handleTabClick('books')}
            >
              Books
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block py-4 px-6 rounded-t-lg ${
                activeTab === 'menu' ? 'text-white bg-primaryColor' : 'text-gray-600 bg-white hover:text-primaryColor'
              }`}
              onClick={() => handleTabClick('menu')}
            >
              Menu
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block py-4 px-6 rounded-t-lg ${
                activeTab === 'events' ? 'text-white bg-primaryColor' : 'text-gray-600 bg-white hover:text-primaryColor'
              }`}
              onClick={() => handleTabClick('events')}
            >
              Events
            </button>
          </li>
        </ul>
      </div>

      <div className="p-4 bg-white shadow rounded-lg mt-5">
        {activeTab === 'books' && <BooksList/>}
        {activeTab === 'menu' && <MenuList/>}
        {activeTab === 'events' && <EventsList/>}
      </div>
    </div>
  );
}

export default CafeList;
