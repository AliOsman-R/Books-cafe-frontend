// src/components/Rating.js
import React, { useEffect, useState } from 'react';
import { TextareaInput } from './inputs';

const Rating = ({ selectedReview, setReview, review}) => {
  // const [rating, setRating] = useState(5);
  // const [hoverRating, setHoverRating] = useState(0);
  // const [comment, setComment] = useState('');

  // // Function to handle hover to show half-star selection
  // const handleMouseOver = (index, offset) => {
  //   const halfStarValue = index + (offset < 0.5 ? 0.5 : 1);
  //   setHoverRating(halfStarValue);
  // };  

  useEffect(() => {
   if(selectedReview)
   {
    setReview({comment: selectedReview.comment, rating: selectedReview.rating})
   }
  }, [selectedReview])
  

  const handleRating = (index) => {
    setReview({...review, rating:index + 1});
  };

  const handleCommentChange = (e) => {
    setReview({...review, comment:e.target.value});
  };

  return (
    <div className="p-4">
      <div className="flex space-x-1 items-center">
        {[...Array(5).keys()].map((index) => (
          <button
            key={index}
            className={`h-8 w-8 text-3xl cursor-pointer ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={(e) => handleRating(index)}
            // onMouseMove={(e) => handleMouseOver(index, e.nativeEvent.offsetX / e.target.offsetWidth)}
            // onMouseLeave={() => setHoverRating(0)}
          >
            &#9733;
          </button>
        ))}
        <span className='ml-3 mt-2 text-gray-400'>({review.rating})</span>
      </div>
      <TextareaInput
        className="mt-4 p-2 border rounded w-full"
        placeholder="Leave a comment..."
        value={review.comment}
        onChange={handleCommentChange}
      />
    </div>
  );
};

export default Rating;
