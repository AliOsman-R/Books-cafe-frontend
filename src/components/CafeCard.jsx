import React from 'react';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import defaultCafeImage from '../assets/default-cafe-image.jpg';
import defaultUserImage from '../assets/default-user-image.jpg';
import { linkBtnStyle } from './buttons';
import { getDayInfo } from '../utils/AppUtils';

const CafeCard = ({ cafe }) => {
  const dayInfo = getDayInfo(cafe.workingDays);
  const {
    name,
    ownerName,
    bio,
    city,
    state,
    rating,
    image,
    ownerImage,
    _id
  } = cafe;
  console.log(cafe.workingDays)

  return (
    <div className="max-w-sm h-[540px] rounded-lg overflow-hidden shadow-lg bg-white">
        <img className="w-full min-w-[384px] h-64 object-cover object-center" src={image || defaultCafeImage} alt={name} />
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img className="w-10 h-10 rounded-full mr-4 object-cover" src={ownerImage || defaultUserImage} alt="Owner" />
              <div>
                <h1 className=' font-semibold'>{ownerName}</h1>
                <p className="text-sm text-gray-600 overflow-hidden" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{city}, {state}</p>
              </div>
            </div>
            <div className="flex items-center">
              <BsStarFill className="text-yellow-400" />
              <BsStarFill className="text-yellow-400" />
              <BsStarFill className="text-yellow-400" />
              <BsStarFill className="text-yellow-400" />
              <BsStarHalf className="text-yellow-400" />
              <span className="ml-1 text-gray-600">{rating}</span>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
            <p className="mt-2 text-gray-600 overflow-hidden w-full h-[50px]">{bio}</p>
          </div>
          <div className='flex justify-between'>
            <strong className={`${dayInfo.status === 'Open'? 'text-green-400' : 'text-red-400'}`}>{dayInfo.status} </strong>
            <span>{dayInfo.status === 'Open' && 'Working Hours: ' + dayInfo.workingHours}</span>
          </div>
        </div>
      <div className="px-6 py-4">
         <Link to={`/cafes/${_id}`} className={`${linkBtnStyle} `}>
            View Cafe
          </Link>
      </div>
    </div>
  );
};

export default CafeCard;
