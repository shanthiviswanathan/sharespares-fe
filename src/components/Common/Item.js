import React from 'react';
import { Link } from "react-router-dom";
const Item = ({item}) => {
    return ( <div className="row border-bottom p-3 mt-3 item-overview" key={item.item_id}>
    <div className="col-lg-7">
        <Link to={`/details/${item.item_id}`}> <h2>{item.title}</h2></Link>
        <h5>{item.subtitle}</h5>
        <hr />
        <h5>Description:</h5>
        <p>{item.description}</p>
    </div>
    <div className="col-lg-5 text-center">
        <Link to={`/details/${item.item_id}`}>
            <img className="d-block w-100" src={item.thumbnail_image||''} alt={item.title}></img>
        </Link>

    </div>
</div> );
}
 
export default Item;