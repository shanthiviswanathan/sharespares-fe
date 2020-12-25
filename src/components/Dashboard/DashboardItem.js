import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Popup from '../Common/Popup';
import AvailabilityModal from '../Common/AvailabilityModal'
import { FaPencilAlt, FaTrash, FaClone, FaRegCalendarAlt } from 'react-icons/fa';
import DeleteModal from './DeleteItemModal'

const DashboardItem = ({ item, btnType,member_id,setReloadItems,itemType}) => {
    const [notification, setNotification] = useState(false),
    [deleteItem,setDeleteItem]=useState(null);



    const handleDelete = async(id) => {
       const { data } = await axios.delete('/delete-item', {
        params: {
            member_id: member_id,
            item_id: id,
        }
    });
        setDeleteItem(null);
        setNotification(data.status && data.status==='Success')
        setReloadItems(itemType)

    }
    const returnItem = async(id) => {
        const { data } = await axios.post('/return-item', {
             member_id: member_id,
             item_id: id,
         
     });
         setNotification(data.status && data.status==='Success')
         setReloadItems(itemType)
 
     }
 

    return (
        <>
     <div className="row border-bottom p-3 mt-3 item-container item-overview" key={item.item_id}>
        <div className="col-lg-7">
            <Link to={`/details/${item.item_id}`}> <h4>{item.title}</h4></Link>
            <h5>{item.subtitle}</h5>
            <hr />
            <h5>Description:</h5>
            <p>{item.description}</p>
        </div>
        <div className="col-lg-5 text-center">
            <Link to={`/details/${item.item_id}`}>
                <img className="d-block w-100 h-10" src={item.thumbnail_image || ''} alt={item.title}></img>
            </Link>
          
                {btnType === 'dropdown' &&
                    <div className="btn-group mt-2">
                        <button type="button" className="btn btn-outline-dark dropdown-toggle " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Manage
                         </button>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item " to={`/edit/item/${item.item_id}`}><FaPencilAlt /><span className="pl-3">Edit</span></Link>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item" onClick={(e)=>{e.preventDefault();setDeleteItem(item)}}><FaTrash /><span className="pl-3" >Delete</span></button>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to={`/clone/item/${item.item_id}`}><FaClone /><span className="pl-3">Copy</span></Link>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item" href="#"  data-toggle="modal" data-target="#exampleModalCenter" ><FaRegCalendarAlt /><span className="pl-3">Edit Availability</span></button>
                        </div>
                        <AvailabilityModal member_id={member_id}item_id={item.item_id}/>

       {!!deleteItem &&
                <DeleteModal item={deleteItem} 
                handleDelete={(id)=>handleDelete(id)}
                cancelDelete={()=>setDeleteItem(null)}/>
            }
           
                    </div>}
                {btnType === 'btn' &&
                    <button className="btn btn-secondary mt-2" onClick={() => returnItem(item.item_id)}>Return</button>
                }


        </div>
    </div>
    {notification && <Popup
        handleCancel={() => setNotification(false)}
        message={'Item has been deleted successfully'}
        alertClass={'alert-primary'}

    />}
    </>);
}

export default DashboardItem;