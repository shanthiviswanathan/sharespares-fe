import React from 'react';
const DeleteItem = ({item ,handleDelete,cancelDelete}) => {
console.log('gegeggege')
    return ( 
        <div className="modal d-block delete-modal" tabIndex="-1" role="dialog" aria-labelledby="deleteModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Delete Item</h5>
                    <button type="button" className="close" aria-label="Close" onClick={()=>cancelDelete()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    Are you sure to delete item?
                 </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={()=>cancelDelete()}>Close</button>
                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(item.item_id)}>Delete</button>
                </div>
            </div>
        </div>
    </div>
     );
}
 
export default DeleteItem;