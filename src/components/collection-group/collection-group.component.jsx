import React from 'react';
import {useHistory, Link} from 'react-router-dom'

import CustomButton from '../custom-button/custom-button.component';

import './collection-group.styles.scss';

const CollectionGroup = ({group, user}) => {
    const {id, name, description, admin_id} = group
    console.log ('In collection group start =', name, 
    ' ', description, ' id = ', id, ' admin = ', admin_id, ' current User = ', user)
    const history = useHistory();

    const handleCreateItem = () => {
      console.log('In create Item')
      history.push( {pathname: `/createitem/${id}`});
    }
    
    const handleManageGroup = () => {
      console.log('In Manage Group id = ', {id})
      history.push( {pathname: `/managegroup/${id}` }   );
    }

    return (
      <div className='collection-group'>
        <div className='collection-group-attr'>
          <div className='name'><Link to= {`/managegroup/${id}`} >{name}</Link></div>
          <div className='description'>{description}</div>
          <div className='links'>
            {user ? (
              <div className='options'>
                <Link className='option' to={`/listitems/${id}`}>
                  Items
                </Link>
                <Link className='option' to={`/listcomments/${id}`}>
                  Comments
                </Link>
               </div> 
            ): <div/>
            } 
            {user.id === admin_id? (
              <div className='buttons'>
                <CustomButton onClick={() => {handleCreateItem()}}> Create Item </CustomButton>
                <CustomButton onClick={() => {handleManageGroup()}}> Manage Group </CustomButton>
              </div> ): <div/>} 
          </div>
        </div>       
      </div>
  
    );
  };

  export default CollectionGroup;