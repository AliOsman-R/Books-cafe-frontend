import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { calculateTimeLeft } from '../utils/AppUtils';
import { BtnLoader } from './LoaderSpinner';
import { PrimaryButton } from './buttons';
import { FaTrashAlt } from 'react-icons/fa';

const EventCard = ({event, cafe, isManage, setOpenModal, handleDelete, setEventData, setOriginalEventData, deleteLoading}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(event.date, event.startTime, event.endTime));

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft(calculateTimeLeft(event.date, event.startTime, event.endTime));
  }, 1000);

  return () => clearInterval(timer);
}, [event.date, event.startTime, event.endTime]);

const displayTimeLeft = () => {
  if (timeLeft.over) {
    return 'Event has ended!';
  } else if (timeLeft.happening) {
    return 'Event is happening now!';
  } else {
    const parts = [];
    if (timeLeft.days) parts.push(`${timeLeft.days}d`);
    if (timeLeft.hours) parts.push(`${timeLeft.hours}h`);
    if (timeLeft.minutes) parts.push(`${timeLeft.minutes}m`);
    if (timeLeft.seconds) parts.push(`${timeLeft.seconds}s`);
    return parts.join(' ') + ' remaining';
  }
};
    return (
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden">
        <img className="w-1/3 min-h-56 max-h-56 object-fit-cover" src={event?.images[0].url} alt="Event" />
        <div className="w-2/3 p-4 flex flex-col justify-between ">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h2 className="text-gray-900 font-bold text-2xl mb-2">{event.title}</h2>
              <p className={`${displayTimeLeft().includes('ended') ? 'text-red-500' : 'text-green-500'} text-sm`}>{displayTimeLeft()}</p>
            </div>
            {cafe && <p className="text-gray-600 text-sm max-h-[20px] overflow-hidden font-bold">Cafe Name: {cafe?.name}</p>}
            <p className="text-gray-700 text-base mb-2 min-h-[52px] max-h-[52px] overflow-hidden">{event.description}</p>
            <p className="text-gray-600 text-sm max-h-[20px] overflow-hidden font-semibold">{event.location}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-primaryColor">{new Date(event.date).toLocaleDateString()} - {event.startTime} - {event.endTime}</p>
            {cafe && <Link to={''} className="text-[15px] font-bold text-primaryColor hover:underline">View Details</Link>}
            {isManage &&
              <div className="flex gap-5 items-center mt-4">
              <PrimaryButton onClick={() => {setOpenModal(true); setEventData(event); setOriginalEventData(event)}} className='h-[20px]'>
                Edit
              </PrimaryButton>
              <button disabled={deleteLoading} onClick={() => handleDelete(event)} className=' bg-red-500 max-w-[32px] max-h-[32px] rounded-full p-2 flex items-center justify-center text-white cursor-pointer hover:bg-red-600 disabled:bg-gray-300'>
                {deleteLoading ? <BtnLoader/> : <FaTrashAlt/>}
              </button>
            </div>}
          </div>
        </div>
      </div>
      );
}

export default EventCard