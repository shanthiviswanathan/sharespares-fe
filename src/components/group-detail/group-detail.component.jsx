import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CollectionItem from '../collection-item/collection-item.component'

import CustomButton from '../custom-button/custom-button.component';

const GroupDetail = ({groupId, currentUser}) => {
    console.log('In Group Detail Start = ', groupId, ' User=', currentUser);
    const [group, setGroup] = useState('' );
    const [items, setItems] = useState('' );
    const [members, setMembers] = useState('' );
    const history = useHistory();
    useEffect(() => {
      const fetchData = async () => {

      try {
        const response = await fetch(`http://localhost:4000/api/groups/${groupId}`);
        const json = await response.json();
        setGroup(json.group[0])
        if (json.items[0]) 
          setItems(json.items)          
        else
          setItems([]) 

        setMembers(json.members)
        console.log('In group-detail after fetch', json)
      } catch (error) {
        console.error('FetchData Error', error);
      }
    };
    fetchData();
    }, [groupId])
    
    const manageMembers = () => {
        console.log('Manage Members. Group Id = ', group.id)
    }

    const createItem = () => {
        console.log('Create Item. Group Id = ', group.id)
        history.push( {pathname: `/createitem/${group.id}`});

    }

    const deleteGroup = () => {
            console.log('In Delete Group')
            confirmAlert({
              title: 'Confirm to submit',
              message: 'Are you sure to do this.',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => alert('Click Yes, refresh collections')
                },
                {
                  label: 'No',
                  onClick: () => alert('Click No')
                }
              ]
            })
          
    }

    const editGroup = () => {
        console.log('In Edit Group')
    }

    const copyGroup = () => {
        console.log('In Copy Group')
    }    
    return (
         <div className = 'group-detail'>
            <div className = 'group-detail-attr'>
                <span className='name'>{group.name}</span>
                <span className='description'>{group.description}</span>
                <span className='memberLimit'>{group.member_limit}</span>
                <span className='rsvpStartDate'>{group.rsvp_start_date}</span>
            </div>
            {currentUser.id === group.admin_id? ( <div>
              <CustomButton onClick={() => manageMembers()} >
                Manage Members
              </CustomButton>
              <CustomButton onClick={() => createItem()} >
                Create Item
              </CustomButton>   
              <CustomButton onClick={() => editGroup()} >
                Edit Group
              </CustomButton>  
              <CustomButton onClick={() => deleteGroup()} >
                Delete Group
              </CustomButton>  
              <CustomButton onClick={() => copyGroup()} >
                Copy Group
              </CustomButton> </div>): <div/>}
              {items.length>0? <h3>Items </h3>: <div/> }
    
              {items.length>0? ( 
                  items.map(item => ( 
                  <CollectionItem key={item.item_id} item={item} user={currentUser} />
                )) ):<div/>  }            

        </div>
      )
}

export default GroupDetail;