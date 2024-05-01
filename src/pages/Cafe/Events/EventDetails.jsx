import React, { useEffect, useState } from 'react';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';
import { FaRegCalendarCheck } from "react-icons/fa";
import { PiClockCountdown } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { calculateDuration } from '../../../utils/AppUtils';
import EventDescription from './EventDescription';

const EventDetails = ({event}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const AreImages = event.images.length > 1 

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? event.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === event.images.length - 1 ? 0 : prevIndex + 1));
  };

//   const renderDescriptionSections = () => {
//     const descriptionSections = event.description.split('\n');
//     return descriptionSections.map((section, index) => (
//         <p key={index} className="mt-2 text-gray-700 font-semibold">{section}</p>
//     ));
// };

  if (!event) {
    return <div className="flex justify-center items-center h-screen">No event found, please try again later.</div>;
  }


  return (
    <div className="container h-full mx-auto px-20 py-8">
      <div className="relative mb-8">
        <img src={event.images[currentImageIndex].url} alt="Event" className="w-full h-[500px] rounded-lg shadow-lg object-cover" />
        <button 
          onClick={handlePrevImage} 
          disabled={!AreImages} 
          className="disabled:cursor-auto disabled:bg-gray-200 absolute top-1/2 left-1 transform -translate-y-1/2 bg-gray-600 bg-opacity-50 rounded-full p-2 shadow-md focus:outline-none"
          >
          <IoMdArrowBack size={30} className="text-white" />
        </button>
        <button 
          onClick={handleNextImage} 
          disabled={!AreImages} 
          className="disabled:cursor-auto disabled:bg-gray-200 absolute top-1/2 right-1 transform -translate-y-1/2 bg-gray-600 bg-opacity-50 rounded-full p-2 shadow-md focus:outline-none"
          >
          <IoMdArrowForward size={30} className="text-white" />
        </button>
      </div>
      <div className="mb-8 flex flex-col gap-4 ">

      <div className="flex justify-between items-center mb-10">
        <p className='font-bold text-[#1e0a3c] text-4xl'>{event.title}</p>
        <p className='font-bold text-primaryColor text-xl'>{event.cafeId.name}</p>
      </div>

        <div className="flex flex-col">
          <label className='text-2xl font-semibold'>Date and time</label>
          <div className="flex pt-4 p-1 gap-1 items-center">
            <span className='mr-2 mb-2 text-blue-500'><FaRegCalendarCheck/></span>
            <p className="text-gray-700 font-semibold mb-2">{new Date(event.date).toDateString()}</p>
            <p className="text-gray-700 font-semibold mb-2"> - {event.startTime} - {event.endTime}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <label className='text-2xl font-semibold'>Location</label>
          <div className="flex pt-4 pl-1 gap-1 items-center">
            <span className='mr-2 mb-2 text-blue-500'><IoLocationOutline size={20} /></span>
            <p className="text-gray-700 font-semibold mb-2">{event.location}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <label className='text-2xl font-semibold'>About this event</label>
          <div className="flex pt-4 pl-1 gap-1 items-center">
            <span className='mr-2 mb-2 p-2 bg-gray-200 rounded-lg text-blue-500'>
              <PiClockCountdown size={20}/>
            </span>
            <p className="text-gray-700 font-semibold mb-2">{calculateDuration(event)}</p>
          </div>
        </div>
        
        <div className="flex flex-col">
          <label className='text-2xl pb-2 font-semibold'>Description</label>
          <div className=""> 
            {/* {renderDescriptionSections()} */}
            <EventDescription description={event.description} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventDetails;
