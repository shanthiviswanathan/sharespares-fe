import React, { useState } from 'react';

const CommentForm = ({onCommentSubmit}) => {
    const [comment, setComment] = useState('');
    const handleSubmit=(event)=>{
        event.preventDefault();
        onCommentSubmit(comment);
    }
    return ( 
        <form className="comment-form" noValidate onSubmit={handleSubmit}>
            <hr/>
               <div className="form-group">
               <label >Comment</label>
                        <textarea className="form-control" rows="3"
                            placeholder="What did you like or dislike?"
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </div>
                    <button className="btn btn-warning" type="submit">submit</button>
            </form>
     );
}
 
export default CommentForm;