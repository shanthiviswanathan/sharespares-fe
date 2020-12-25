import React from 'react';

const Popup = ({handleCancel,alertClass, message}) => {

    return (  
        <div className={`alert ${alertClass} alert-dismissible fade show`} role="alert">
    <h4 className="alert-heading">{alertClass==='alert-primary'?'Congrations ':'We are sorry '}!</h4>
    <p>
        {message}
    </p>
    <hr />
    <h5 className="mb-0">
        <span aria-hidden="true" data-dismiss="alert" onClick={() => handleCancel(false)}>OKAY</span>
    </h5>

    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => handleCancel(false)}>
        <span aria-hidden="true">&times;</span>
    </button>
</div> );
}
 
export default Popup;