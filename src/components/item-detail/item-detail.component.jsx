import React, {useState, useEffect, useContext} from 'react'
import UserContext from '../../contexts/user.context'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Rating from '../rating/rating.component';
import Reservation from '../reservation/reservation.component';

import CustomButton from '../custom-button/custom-button.component';
var currentUser;
const ItemDetail = ({itemId}) => {
    console.log('In Item Detail Start = ', itemId);
    currentUser  = useContext(UserContext);
    console.log('currentUser = ', currentUser)
    const [item, setItem] = useState('' );
    useEffect(() => {
      const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/items/${itemId}`);
        const json = await response.json();
        setItem(json)
        console.log('In item-detail after fetch', json)
      } catch (error) {
        console.error('FetchData Error', error);
      }
    };
    fetchData();
    }, [itemId])
    
    const deleteItem = () => {
            console.log('In Delete Item')
            confirmAlert({
              title: 'Confirm to submit',
              message: 'Are you sure to do this.',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => alert('Clicked Yes, refresh collections')
                },
                {
                  label: 'No',
                  onClick: () => alert('Clicked No')
                }
              ]
            })
          
    }

    const editItem = () => {
        console.log('In Edit Item')
    }

    const copyItem = () => {
        console.log('In Copy Item')
    }    
    return (
      <div className="container mt-2">
        <div className="row">
            <div className="col-lg-6">
                <h2>{item.title}</h2>
                <h5>
                    {item.subtitle}
                </h5>
                <hr />
                <div>
                    <h5>Description</h5>
                    <p> {item.description}</p>
                    <p> {item.featured_desc1}</p>
                    <p> {item.featured_desc2}</p>
                    <p> {item.featured_desc3}</p>
                </div>
                <div>
                   <h5>Category</h5>
                   <p> {item.category}</p>
                </div>

            <CustomButton onClick={() => editItem()} >
                Edit Item
            </CustomButton>  
            <CustomButton onClick={() => deleteItem()} >
                Delete Item
            </CustomButton>  
            <CustomButton onClick={() => copyItem()} >
                Copy Item
            </CustomButton>  
            <br></br>
          </div>

          <div className="col-lg-6 pt-3 pl-5 fixedcolumn">
          <Rating totalReviews={'72,707'} rating={4.5} />
          {!!currentUser && item.item_id ?
              <Reservation
                  memberId={currentUser.id} itemId={item.item_id}
                />

              : ''}

      </div>
         </div>
        </div>
      )
}

export default ItemDetail;