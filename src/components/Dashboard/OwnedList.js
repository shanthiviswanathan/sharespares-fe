import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../UserContext';
import axios from 'axios';
import Item from './DashboardItem'
import { Link } from "react-router-dom";

const OwnedList = () => {
    const [ownedItems, setOwnedItems] = useState([]);
    const [borrowedItems, setBorrowedItems] = useState([]);
    const [reservedItems, setReservedItems] = useState([]);
    const { user } = useContext(UserContext);

    const fetchData = async (type) => {
        const { data } = await axios.get('/my-items', {
            params: {
                member_id: user.member_id,
                item_type: type,
                start: 0,
                count: 4
            }
        })
        if (type === 'owned') setOwnedItems(data);
        if (type === 'borrowed') setBorrowedItems(data);
        if (type === 'reserved') setReservedItems(data);
    }

    useEffect(() => {
        if(!!user && !!user.member_id){
            fetchData('owned');
            fetchData('borrowed');
            fetchData('reserved');
        }
       
    }, [user,user.member_id])// eslint-disable-line react-hooks/exhaustive-deps



    return (<>{!!user &&
        <div className="p-3">
            {/* Borrowed */}
            <div className="row">
                <h4 className="col-9">My Borrowed Items</h4>
                {borrowedItems.length > 3 && <Link className="col-3 text-right" to='/myitems/borrowed' >Show more </Link>
                }
            </div>
           
            {!!borrowedItems.length ? borrowedItems.slice(0, 3).map((item, i) =>
                <Item item={item} key={i}  btnType={'btn'} 
                member_id={user.member_id}
                setReloadItems={(itemType)=>fetchData(itemType)}
                itemType={'borrowed'}
                />
            ) : <div>No item is borrowed</div>}

            {/* Items */}
            <div className="row mt-5">
                <h4 className="col-9">My Items</h4>
                {ownedItems.length > 3 && <Link to={`/myitems/${'owned'}`} className="col-3 text-right" >Show more </Link>}
            </div>
           
            {!!ownedItems.length ? ownedItems.slice(0, 3).map((item, i) =>
                <Item item={item} key={i}
                    btnType={'dropdown'}
                    member_id={user.member_id}
                    setReloadItems={()=>fetchData('owned')}
                    itemType={'owned'}/>)
                : <div>No items </div>}

            {/* Reserved */}
            <div className="row mt-5">
                <h4 className="col-9">My Reserved Items</h4>
                {reservedItems.length > 3 && <Link className="col-3 text-right" to='/myitems/reserved' >Show more </Link>}
            </div>
           
            {!!reservedItems.length ? reservedItems.slice(0, 3).map((item, i) =>
                <Item item={item} key={i}  btnType={'dropdown'}
                    member_id={user.member_id}
                    setReloadItems={()=>fetchData('reserved')}
                    itemType={'reserved'}
                     />)
                : <h3>No item is reserved</h3>}
        </div>}

    </>);
}

export default OwnedList;