import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import RatingPopover from './RatingPopover'
const yellowColor = '#ffc107';
const grayColor = '#e4e5e9';
const AvgRating = ({ reviews, size }) => {
    const [avgRating, setAvgRating] = useState(null);
    const [totalReviews, setTotalReviews] = useState(null);
    const [ratingsCount, setRatingsCount] = useState(null);


    useEffect(() => {
        const totalRatings = reviews.reduce((a, c) => {
            return (a = a + c.num_of_likes)
        }, 0)
        const totalReview = reviews.length;
        const ratingAvg = (totalRatings / totalReview).toFixed(1)
        const roundedAvg = Math.round(ratingAvg * 2) / 2;

        let count = [reviews.filter(review => review.num_of_likes === 5).length,
        reviews.filter(review => review.num_of_likes === 4).length,
        reviews.filter(review => review.num_of_likes === 3).length,
        reviews.filter(review => review.num_of_likes === 2).length,
        reviews.filter(review => review.num_of_likes === 1).length
        ];
        setRatingsCount(count)
        setTotalReviews(totalReview)
        setAvgRating(roundedAvg);
    }, [reviews]);

    return (
        <div className="row pt-3">
              <div className="col-lg-6 text-center">
                  <h3>{totalReviews}  <span className="pl-2">Ratings</span></h3>
                 
                
                 </div>
                 <div className="col-lg-6 text-left">  
            {!!avgRating  && [...Array(5)].map((arr, i) => {
                const ratingVal = i + 1;
                const IsInt = Number.isInteger(avgRating)
                if (IsInt) {
                    return (
                        <FaStar className="star" key={i}
                            color={ratingVal <= avgRating ? yellowColor : grayColor}
                            size={size}
                        />)
                } else {
                    const wholeInteger = Math.floor(avgRating);
                    if (ratingVal <= wholeInteger) {
                        return (
                            <FaStar className="star" key={i}
                                color={yellowColor}
                                size={size}
                            />
                        )
                    }
                    if (ratingVal === wholeInteger + 1) {
                        return (
                            <FaStarHalfAlt className="star" key={i}
                                color={yellowColor}
                                size={size}
                            />
                        )
                    } else if (ratingVal > wholeInteger + 1) {
                        return (
                            <FaStar className="star" key={i}
                                color={grayColor}
                                size={size}
                            />
                        )
                    }
                }}
            )}
            { ratingsCount && <RatingPopover ratingsCount={ratingsCount}/>}    
            </div>
        </div>);
}

export default AvgRating;