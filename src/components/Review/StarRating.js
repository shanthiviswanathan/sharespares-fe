import React, { } from 'react';
import {  FaStar } from 'react-icons/fa';

const yellowColor = '#ffc107';
const grayColor = '#e4e5e9';

const StarRating = ({rating,size}) => {
    return ( <>
        {[...Array(5)].map((arr, i) => {
            const ratingVal = i + 1;
            return (
                <FaStar className="star" key={i}
                    color={ratingVal <= rating ? yellowColor : grayColor}
                    size={size}
                />
            )
        }
        )}
         </>
     );
}
 
export default StarRating;