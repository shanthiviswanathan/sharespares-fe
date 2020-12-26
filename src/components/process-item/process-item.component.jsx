import React, {useState, useEffect} from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import CustomButton from '../custom-button/custom-button.component';

const ProcessItem = ({txnType, itemId, currentUser}) => {
    console.log('In Item Detail Start = ', itemId);
    const [item, setItem] = useState('' );
    useEffect(() => {
      const fetchData = async () => {

      try {
        const response = await fetch(`http://localhost:4000/api/items/${itemId}`);
        const json = await response.json();
        setItem(json)
        console.log('In dashboard after fetch', json)
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
         <div className = 'item-detail'>
            <div className = 'item-detail-attr'>
                <span className='name'>{item.name}</span>
                <span className='description'>{item.description}</span>
                <span className='status'>{item.status}</span>
                <span className='category'>{item.category}</span>
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
      )
}

export default ProcessItem;