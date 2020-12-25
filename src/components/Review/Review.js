  
import React from 'react';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm'

const Reviews = ({ reviews, isLoggedIn, onReviewCreate, onCommentCreate }) => {



    return (<div className="row pt-5 review-container">

        <h3 className="pl-2 pb-2 col-12 "> Customer Reviews</h3>
    

        <div className="col-12 create-review-container">
            {isLoggedIn && <ReviewForm
                submitReview={(review) => { onReviewCreate(review) }}
            />}
            <hr />
            {!!reviews.length &&
                <ReviewList
                    reviews={reviews}
                    isLoggedIn={isLoggedIn}
                    submitComment={({ comment, rated_object_id }) => onCommentCreate({ comment, rated_object_id })}
                />
            }

        </div>

    </div>);
}

export default Reviews;

