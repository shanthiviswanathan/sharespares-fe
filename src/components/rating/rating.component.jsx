import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
const yellowColor = '#ffc107';
const grayColor = '#e4e5e9';
const Rating = ({ rating, totalReviews }) => {
    console.log('In Rating Start = ', totalReviews);
    return (
        <div className=" row">
            <div className="col-lg-6 text-right">
                {!!rating && [...Array(5)].map((arr, i) => {
                    const ratingVal = i + 1;
                    const IsInt = Number.isInteger(rating)
                    if (IsInt) {
                        return (
                            <FaStar className="star" key={i}
                                color={ratingVal <= rating ? yellowColor : grayColor}
                                size={30}
                            />)
                    } else {
                        const wholeInteger = Math.floor(rating);
                        if (ratingVal <= wholeInteger) {
                            return (
                                <FaStar className="star" key={i}
                                    color={yellowColor}
                                    size={30}
                                />
                            )
                        }
                        if (ratingVal === wholeInteger + 1) {
                            return (
                                <FaStarHalfAlt className="star" key={i}
                                    color={yellowColor}
                                    size={30}
                                />
                            )
                        } else if (ratingVal > wholeInteger + 1) {
                            return (
                                <FaStar className="star" key={i}
                                    color={grayColor}
                                    size={30}
                                />
                            )
                        }
                    }
                }
                )}   
            </div>
            <div className="col-lg-6 pt-1 text-left">
               <h4>
                {totalReviews}<span className="pl-2">Ratings</span>
               </h4>
            </div>
        </div>
        );
}

export default Rating;
