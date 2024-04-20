import React from 'react';
import { PrimaryButton } from './buttons';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { getDayInfo } from '../utils/AppUtils';
import { BtnLoader } from './LoaderSpinner';
import { FaTrashAlt } from 'react-icons/fa';

const MenuCard = ({ menuItem , isManage, setOpenModal, handleDelete, setMenuItemData, setOriginalMenuData, deleteLoading, cafe}) => {
  const isDisabled = menuItem?.stock === 0 || getDayInfo(cafe?.workingDays || []).status === 'Closed' || menuItem?.status === 'Not Available'
  
  return (
    <div className="max-w-[350px] h-[458px] rounded-lg overflow-hidden shadow-md bg-white m-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
    <img className="w-full min-w-[350px] h-56 object-cover object-center" src={menuItem.images[0].url} alt={menuItem.name} />

    <div className="p-5 flex flex-col justify-between">
      <div className="">
        <h5 className="mb-1 text-lg font-semibold tracking-tight text-gray-900">{menuItem.name}</h5>
        <div className="flex justify-between">
          {menuItem.isCountable && <p className={`${menuItem.stock > 0 ? "text-green-500" : "text-red-500"} mb-2`}>{menuItem.stock > 0 ? `${menuItem.stock} available` : "Out of Stock"}</p>}
          {!menuItem.isCountable && <p className={`${menuItem.status === 'Available'? "text-green-500" : "text-red-500"} mb-2`}>{menuItem.status}</p>}
          {/* <p className={`${menuItem.isCountable ? "text-green-500" : "text-red-500"} mb-2`}>{menuItem?.stock} {menuItem.status}</p> */}
          <div className="mb-2">
              <StarRating rating={menuItem.averageRating} />
          </div>
        </div>
        <p className="mb-3 text-sm text-gray-700 overflow-hidden min-w-[310px] max-h-[40px]">{menuItem.description}</p>
        <div className="text-sm mb-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-semibold">Type: {menuItem.type}</p>
            <p className="font-semibold text-gray-900 ">{menuItem.price.toFixed(2)} RM</p>
          </div>
        </div>
      </div>
      {cafe &&
       <div className="flex justify-between items-center mt-4">
        <PrimaryButton disabled={isDisabled}  className='h-[20px]'>
          Add to Cart
        </PrimaryButton>
        <Link to={''} className="text-xs font-bold text-primaryColor hover:underline">View Details</Link>
      </div>}
      {isManage &&
        <div className="flex justify-between items-center mt-4">
          <PrimaryButton onClick={() => {setOpenModal(true); setMenuItemData(menuItem); setOriginalMenuData(menuItem)}} className='h-[20px]'>
            Edit
          </PrimaryButton>
          <button disabled={deleteLoading} onClick={() => handleDelete(menuItem)} className=' bg-red-500 max-w-[32px] max-h-[32px] rounded-full p-2 flex items-center justify-center text-white cursor-pointer hover:bg-red-600 disabled:bg-gray-300'>
            {deleteLoading ? <BtnLoader/> : <FaTrashAlt/>}
          </button>
        </div>
      }
    </div>
  </div>
);
}

export default MenuCard;
