import React, { useState } from 'react';

const Rating = ({ submitRating }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 0.5;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => submitRating(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(rating)}
              style={{ display: 'none' }}
            />
            <span
              className="star"
              style={{ color: ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9" }}
            >
              ★
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
