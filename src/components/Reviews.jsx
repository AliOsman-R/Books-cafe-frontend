import React from 'react';
import StarRating from './StarRating';
import { AppLoader } from './LoaderSpinner';

const Reviews = ({ reviews }) => {
  const areReviews = reviews?.length > 0
    
  return (
    <>
    <div className="md:w-full mt-8 md:mt-0">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="flex flex-col gap-2 max-h-[365px] overflow-scroll mb-5">
            {areReviews && reviews.map((review) => (                
            <div className="bg-white dark:bg-gray-100 shadow-md rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                    <span className="text-gray-800 dark:text-gray-700 text-lg font-semibold">
                    {review.userId.name || review?.customerName}
                    </span>
                    <div className="flex items-center space-x-2">
                    <StarRating rating={review.rating} />
                    <span className="text-gray-600 dark:text-gray-500 text-sm">({review.rating})</span>
                    </div>
                </div>
                <p className="text-gray-700 dark:text-gray-600 text-base mt-4">{review.comment}</p>
            </div>
            ))}
            {!areReviews && 
            <div className="flex justify-center items-center h-[150px] bg-white dark:bg-gray-100 shadow-md rounded-lg p-4 mb-4">
              <span className='text-xl text-gray-400'>No Reviews available</span>
            </div>
            }
        </div>
    </div>
    </>
  );
};

export default Reviews;
