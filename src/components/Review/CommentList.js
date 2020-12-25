import React, {} from 'react';
import { FaUserCircle } from 'react-icons/fa';
const CommentList = ({comments}) => {
    return ( 
        <div className="comments-container">
        {comments.map(comment=><div key={comment.feedback_id}> 
            <h4><FaUserCircle className="pr-3" size={50} />{comment.display_name}</h4>
            <p className="pl-5">{comment.feedback_text}</p>
            <hr/>
        </div>)}

        </div>
     );
}
 
export default CommentList;