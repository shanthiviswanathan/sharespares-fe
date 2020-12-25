import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment'


import CommentForm from './CommentForm';
import CommentList from './CommentList';
import StarRating from './StarRating';

const ReviewList = ({ reviews, submitComment }) => {
    const [showForm, setShowForm] = useState(false);
    const [showCommentsId, setShowCommentsId] = useState(null);
    const [sortBy, setSortBy] = useState('Date Descending');
    const [showFormId, setShowFormId] = useState(null);

    const [reviewList, setSeviewList] = useState([]);
    const sortingList={'rating-ascending':'Rating Ascending',
    'rating-descending':'Rating Descending',
    'date-ascending':'Date Ascending',
    'date-descending':'Date Descending'

    }
    useEffect(() => {
        setSeviewList(reviews)
    }, [reviews]);
    const handleSorting = (order) => {
        let sortedArray = reviews.sort(function (a, b) {
            if (order === 'rating-ascending') return a.num_of_likes - b.num_of_likes;
            else if(order === 'rating-descending') return (b.num_of_likes - a.num_of_likes);
            else if(order === 'date-ascending')
            return new Date(a.created_date)-new Date(b.created_date);
            else return new Date(b.created_date)-new Date(a.created_date);
        });
        setSeviewList(sortedArray)
        setSortBy(sortingList[order])
    }

    return (
        <>
        {reviewList.length>1 &&
        <div className="d-flex">
        <label className="pr-2 pt-1">Sort rating by: </label>
        <div className="dropdown">
  <button className="btn btn-light dropdown-toggle" type="button" id="dropdownSortSelect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  { sortBy}
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownSortSelect">
    <button className="dropdown-item" onClick={() => handleSorting('rating-ascending')}>Rating Ascending</button>
    <button className="dropdown-item"  onClick={() => handleSorting('rating-descending')}>Rating Descending</button>
    <button className="dropdown-item"  onClick={() => handleSorting('date-ascending')}>Date Ascending</button>
    <button className="dropdown-item" onClick={() => handleSorting('date-descending')}>Date Descending</button>
 
  </div>
</div>


        </div>
}
          <div className={`${reviewList.length>5?'add-scroll':'' } r-l`}>
            {reviewList.map((review, i) => <div key={i} >
                <div className="review pt-3">
                    <h4><FaUserCircle className="pr-3" size={50} />{review.display_name}</h4>
                    <p className="float-right"> {moment(review.created_date).format('DD-MM-YYYY HH:mm:ss')}</p>
                    <div className="pl-5">
                        <StarRating rating={review.num_of_likes} size={30} />

                        <h5 className="pt-3">{review.feedback_subobject}</h5>
                        <p>{review.feedback_text}</p>
                       

                        {/* commnets  */}
                        <div className="mt-4">
                        {
                        !!review.comments.length ?<>
                                {review.comments.length} <span className="pl-1">comments</span>
                                    <button className={`btn btn-sm ml-2 ${showCommentsId!==i ?'btn-outline-dark':'btn-dark'}`} onClick={() => setShowCommentsId(showCommentsId===i?null:i)}>{showCommentsId!==i ? 'Show comments' : 'Hide comments'}</button> </> : null
                        }
                         { (showFormId!==i)&& <button className="btn btn-sm ml-2 btn-outline-danger" onClick={() => {setShowForm(true); setShowFormId(i)}}> Add comment</button>
                        }
                        </div>
                        
                        {showForm && (showFormId===i)&&<CommentForm onCommentSubmit={(comment) => { setShowForm(false);setShowFormId(null); submitComment({ comment, rated_object_id: review.feedback_id }) }} />
                        }
                        {!!review.comments.length && (showCommentsId===i ) &&
                            <CommentList comments={review.comments} />
                        }

                    </div>

                </div>

            </div>)
            }
            </div>
        </>

    );
}

export default ReviewList;