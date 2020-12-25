import React from 'react';
import Reservation from './Reservation'
const AvailabilityModal = ({member_id,item_id}) => {
    return (  <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Availability</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
      
                    <Reservation
                        memberId={member_id} itemId={item_id}
                        buttonTitle={'Block'}
                    />
        
            </div>
        </div>
    </div>
</div> );
}
 
export default AvailabilityModal;