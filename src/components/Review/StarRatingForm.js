import React, { useState} from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = (props) => {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    return (
        <div>
            {[...Array(5)].map((arr, i) => {
                const ratingVal = i + 1;
                return (<label key={i}>
                    <input type="radio"
                        name="rating"
                        value={ratingVal}
                        onClick={() => { setRating(ratingVal); props.starRating(ratingVal) }} />
                    <FaStar className="star"
                        color={ratingVal <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                        size={50}
                        onMouseEnter={() => setHover(ratingVal)}
                        onMouseLeave={() => setHover(null)}
                    />
                </label>
                )
            }
            )}
        </div>
    );
}

export default StarRating;