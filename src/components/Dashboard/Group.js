import React from 'react';
import { Link } from "react-router-dom";
const Group = ({ groups }) => {
    return (<>
        {groups.map((group) => <div className="row mb-3 p-3 box-shadow" key={group.name}>

            <div className="col-lg-8">
                <Link to={`/group/${group.id}`}>
                <h4>{group.name}</h4>
                </Link>
                <h6>Description:</h6>
                <p>{group.description}</p>
            </div>
            <div className="col-lg-4">
                <img className="d-block w-100 h-10" src={group.thumbnail_image || ''} alt={group.name}></img>
            </div>
            <div className="d-flex justify-content-around w-100 mt-3">
                <Link >Items</Link>
                <Link >Comments</Link>
                <Link className="btn btn-outline-dark" to={`/create/group-item/${group.id}`}>CREATE ITEM</Link>

                <div className="dropdown">
                    <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        MANAGE GROUP
                 </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item" href="#">Edit Group</button>
                        <button className="dropdown-item" href="#">Delete Group</button>
                        <button className="dropdown-item" href="#">Copy Group</button>
                        <button className="dropdown-item" href="#">Create Item</button>
                        
                    </div>
                </div>

            </div>
        </div>
        )}
    </>);
}

export default Group;