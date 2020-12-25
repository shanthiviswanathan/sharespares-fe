import React, { useEffect, useContext, useState } from 'react';
import UserContext from '../../UserContext';
import { useParams } from "react-router-dom";
import axios from 'axios';
import AvgRating from '../Review/AvgRating';
import Reservation from '../Common/Reservation';
import Reviews from '../Review/Review';
import moment from 'moment';
import Popup from '../Common/Popup';

const Details = () => {
    const { id } = useParams();
    const [item, setItem] = useState([])
    const [isMobile, setIsMobile] = useState(false)
    const { user } = useContext(UserContext);
    const [notification, setNotification] = useState({}),
        [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data } = await axios(`/items/${Number(id)}`);
            setItem(data);
            fetchFeedback(data.item_id);
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        setIsMobile(window.innerWidth < 1200)
    }, [])
    const fetchFeedback = async (itemId) => {
        const { data } = await axios.get(`/feedbacks`, {
            params: {
                itemId:itemId,
                start: 0,
                count: 10
            }
        })
        setReviews(data)
    }
    const submitFeedback=async(feedback)=>{
        feedback.created_by= user.member_id
       feedback.feedback_by= user.member_id
       feedback.feedback_date= moment().format("YYYY-MM-DD HH:mm:ss")
       feedback.created_date= moment().format("YYYY-MM-DD HH:mm:ss")
       try {
          await axios.post(`/rating`, { ...feedback })
          fetchFeedback(item.item_id);
       } catch (e) {  
           setNotification({
               status: true,
               class: 'alert-danger',
               message: 'Something went wrong'
           })
       }

   }

    const onReviewSubmit = async (review) => {
        let feedback = {
            num_of_likes: review.starRating,
            feedback_type:'REVIEW',
            feedback_object_type: 'ITEM',
            feedback_object_id: item.item_id,
            feedback_subobject: review.heading,
            feedback_text: review.review  
        }
        
        submitFeedback(feedback);


    }
    const onCommentSubmit = async (comment, rated_object_id) => {
        let feedback = {
            num_of_likes: null,
            feedback_type:'COMMENT',
            feedback_object_type: 'REVIEW',
            feedback_object_id: rated_object_id,
            feedback_subobject: null,
            feedback_text: comment 
        }
        submitFeedback(feedback);
    }




    return (<div className="container primary-container mt-5">
        <div className="row">
            <div className="col-lg-6">
                <h2>{item.title}</h2>
                <h5>
                    {item.subtitle}
                </h5>
                <hr />
                <div>
                    <h5>Sparkling clean</h5>
                    <p>
                        {item.featured_desc1}
                    </p>
                </div>
                <div>
                    <h5>Great check-in experience</h5>
                    <p>
                        {item.featured_desc2}
                    </p>
                </div>
                <div>
                    <h5>Cancellation policy</h5>
                    <p>
                        {item.featured_desc3}
                    </p>
                </div>

            </div>
            <div className={`col-lg-6 pt-3 pl-5 border-box ${isMobile ? 'mobilecolumn' : ''}`}>
                {!!reviews.length &&
            <AvgRating reviews={reviews} size={30} /> }
                {/* <Rating totalReviews={'72,707'} rating={4.5} isMobile={isMobile} /> */}
                {!!user && item.item_id ?
                    <Reservation
                        memberId={user.member_id} itemId={item.item_id}
                    />
                    : ''}

            </div>
        </div>
        <div className="col-lg-12 mt-5">
            <Reviews 
            reviews={reviews}
                isLoggedIn={!!user}
                onReviewCreate={(review) => onReviewSubmit(review)}
                onCommentCreate={({ comment, rated_object_id }) => onCommentSubmit(comment, rated_object_id)}
            />

        </div>



        {!!Object.keys(notification).length && <Popup
            handleCancel={() => setNotification({})}
            message={notification.message}
            alertClass={notification.class}

        />}
    </div>);
}

export default Details;
