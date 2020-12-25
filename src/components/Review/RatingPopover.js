import React, { useEffect } from 'react';
import $ from 'jquery';
import StarRating from './StarRating'
import { FaArrowCircleDown } from 'react-icons/fa';


const RatingPopover = ({ ratingsCount }) => {

  const Popover = () => <ul className="popover-list">
    {ratingsCount.map((rating, i) =>
      <li key={i}> <StarRating rating={5 - i} size={20} /> {rating} Reviews</li>
    )

    }
  </ul>;

  useEffect(() => {
  
    $('[data-toggle="popover"]').popover({
      html: true, content: function () {
        return $('#popover').html();
      }
    });
    $('.popover-dismiss').popover({
      trigger: 'focus'
    })

  }, [])
  return (
    <>
      <div className="btn-group">
        <button type="button" className="btn btn-link btn-icon ml-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <FaArrowCircleDown /></button>
        <div className="dropdown-menu">
          <h6 className="dropdown-header">Rating Details</h6>
          <Popover />

        </div>
      </div>


    </>
  );
}


export default RatingPopover;
