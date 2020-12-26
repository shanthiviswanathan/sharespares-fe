import React from 'react';
import {useHistory} from 'react-router-dom'

import CustomButton from '../custom-button/custom-button.component';

import './collection-item.styles.scss';

const CollectionItem = ({item, user, itemChanged}) => {
    const {item_id, name, description, status, owner_id} = item
    console.log ('In collection item start =', name, 
    ' ', description, ' id = ', item_id, ' ', status, ' user= ', user.id, 'Owner=', owner_id)
    var isOwner = false
    if (user.id === owner_id ) {isOwner = true}
    console.log('isowner = ', isOwner)
    const history = useHistory();
    
   const handleProcessItem = async (txnType) => {
    try {
      await fetch('http://localhost:4000/api/items/process', {
        method: 'post',
        body: `txnType=${txnType}&itemId=${item_id}&memberId=${owner_id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        } 
      }).then(res => { 
          if (res.status >= 400) {
            throw new Error("Bad response from server");
          }
          console.log('Item Id in res = ', res.text)
          return res.text
        }).then(data => console.log('Item Id = ', data));
      alert("Item successfully processed") 
     
    } catch (error) {
      console.error(error);
    }

   history.push( {pathname: '/dashboard', state: {itemChanged: true}});
  };     
   
    const handleManageItem = () => {
      console.log('In Manage Item id = ', {item_id})
      history.push( {pathname: `/manageitem/${item_id}` }   );
    }
    
    const renderButton = () => {
      console.log("I am in renderButton ", isOwner)
      return (isOwner? (  
            <CustomButton onClick={() => {handleProcessItem('RETURN')}}> Return </CustomButton>
           ): (  
            <CustomButton onClick={() => {handleProcessItem('RESERVE')}}> Reserve </CustomButton>
           )
      )
    }
    
    return (
      <div className='collection-item'>
        <div className='collection-item-attr'>
          <div className='name'>{name}</div>
          <div className='description'>{description}</div>
          <div className='links'>
            <div className='buttons'>
              <CustomButton onClick={() => {handleManageItem()}}> Manage Item </CustomButton>
                {user && !isOwner? (
                  ( () => {
                    switch (status) {
                        case 'BORROWED': { return (
                        <CustomButton onClick={() => {handleProcessItem('AVAILABLE')}}> Return </CustomButton>
                         )}
                         case 'RESERVED': { return (
                          <CustomButton onClick={() => {handleProcessItem('UNRESERVE')}}> Release Hold </CustomButton>
                           )} 
                        case 'LOANED': {return (
                         renderButton()
                        ) }
                        default:
                            return null;
                    }
                    }) () 
                ): <p></p> } 
                </div> 
        </div> 
        </div>  
      </div>
    );
  };

  export default CollectionItem;