import React, {useState, useEffect} from 'react';

import './dashboard.styles.scss';

import CollectionGroup from '../../components/collection-group/collection-group.component';
import CollectionItem from '../../components/collection-item/collection-item.component';

const DashboardPage = ({currentUser }) => {
  console.log('In Dashboard Start = ', currentUser);
  const [groups, setGroups] = useState([] );
  const [items, setItems] = useState([] );
  const [ownerItems, setOwnerItems] = useState([] );
  const [otherItems, setOtherItems] = useState([] );
 
  useEffect(() => {
    let userid = -1
    currentUser? userid = currentUser.id: userid = -1
    console.log('In Dashboard userid = ', userid);

    const fetchGroups = async () => {
    try {
        const response = await fetch(`http://localhost:4000/api/groups/user/${userid}`);
        const json = await response.json();
        console.log('In dashboard after groups fetch', json)
        setGroups(json)
      } catch (error) {
        console.error('FetchGroups Error', error);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/items/user/${userid}`);
        const json = await response.json();
        console.log('In dashboard after items fetch', json)
        if (json.message) {
          setItems([]) 
          throw new Error(json.message);
        }
        
        setItems(json)
        setOwnerItems(items.filter(item=>item.owner_id===currentUser.id))
        setOtherItems(items.filter(item=>item.owner_id!==currentUser.id))
        console.log('# of owneritems = ', ownerItems.length, '# of otheritems= ', otherItems.length)
      } catch (error) {
        console.error('FetchItems Error', error);
      }
    };
    if (userid !== -1) {
      fetchItems();
    }
    fetchGroups();

      },[currentUser])
    
    return (
    <div className='dashboard'>
    <div className='dashboard-item'>
    <div className='dashboard-headertext'>
    {ownerItems.length>0? <span>My Items</span>: <p/> }
    </div>
    {ownerItems.length>0? ( 
        ownerItems.map(filtereditem => ( 
        <CollectionItem key={filtereditem.item_id} item={filtereditem} user={currentUser} />
      )) ):<div/>  }
    
    {otherItems.length>0? <h3>Borrowed/Reserved Items </h3>: <div/> }

    {otherItems.length>0? (  
        otherItems.map(filtereditem => (
        <CollectionItem key={filtereditem.item_id} item={filtereditem} user={currentUser} />
      ) ) ): <div/>}
      </div>
      <div className='dashboard-group'>
      {groups.map(group => (
        <CollectionGroup key={group.id} group={group} user={currentUser}/>
      ))}
      </div>
  </div> 
    )
  }
export default DashboardPage;