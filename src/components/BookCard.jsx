import React from 'react'
import StarRating from './StarRating'
import { Link } from 'react-router-dom'
import { PrimaryButton } from './buttons'
import { getDayInfo } from '../utils/AppUtils'
import { FaTrashAlt } from 'react-icons/fa'
import { BtnLoader } from './LoaderSpinner'

const BookCard = ({book, cafe, isManage, setOpenModal, handleDelete, setBookData, setOriginalBookData, deleteLoading}) => {
    const isDisabled = book.stock === 0 || getDayInfo(cafe?.workingDays || []).status === 'Closed'
    const isForSelling = book.availability === 'Selling'

  return (
     <div className="max-w-[350px] h-[458px] rounded-lg overflow-hidden shadow-md bg-white m-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
    <img className="w-full min-w-[350px] h-56 object-cover object-center" src={book.images[0].url} alt={`Cover of ${book.title}`} />

    <div className="p-5">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 overflow-hidden max-h-[28px]">{book.title}</h5>
      <div className="mb-2">
        <StarRating rating={book.averageRating} />
      </div>
      <div className="text-sm">
        <p className="text-primaryColor font-bold max-h-[20px] overflow-hidden">Author: {book.author}</p>
        <p className='font-semibold max-h-[20px] overflow-hidden'>Genre: <span className="text-gray-600 font-bold">{book.genre}</span></p>
        <p className='font-semibold'>Price: <span className="font-bold text-gray-600">{isForSelling?book.price.toFixed(2) + ' RM' : 'Not for sell'}</span></p>
        <div className="flex justify-between">
          {isForSelling && <p className='font-semibold'>Stock: {" "}
            <span className={`${book.stock > 0 ? "text-green-500" : "text-red-500"} font-bold`}>
              {book.stock > 0 ? `${book.stock} available` : "Out of Stock"}
            </span>
            </p>}
          {!isForSelling && <p className={`${book.status=== 'Available'? "text-green-500" : "text-red-500"} font-semibold`}>{book.status}</p>}
          <p className='font-semibold'>{book.availability}</p>
        </div>
      </div>
      {cafe && <div className="flex justify-between items-center mt-4">
        <PrimaryButton disabled={isDisabled}  className='h-[20px]'>
          Add to Cart
        </PrimaryButton>
        <Link to={''} className="text-xs font-bold text-primaryColor hover:underline">View Details</Link>
      </div>}
      {isManage &&
        <div className="flex justify-between items-center mt-4">
          <PrimaryButton onClick={() => {setOpenModal(true); setBookData(book); setOriginalBookData(book)}} className='h-[20px]'>
            Edit
          </PrimaryButton>
          <button disabled={deleteLoading} onClick={() => handleDelete(book)} className=' bg-red-500 max-w-[32px] max-h-[32px] rounded-full p-2 flex items-center justify-center text-white cursor-pointer hover:bg-red-600 disabled:bg-gray-300'>
            {deleteLoading ? <BtnLoader/> : <FaTrashAlt/>}
          </button>
        </div>
      }

    </div>
  </div>
  )
}

export default BookCard