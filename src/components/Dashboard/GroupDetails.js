import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const GroupDetails = () => {
    const { id } = useParams();
    const [group, setGroup]=useState({});
   const getGroup=async()=>{
        const {data}=await axios.get(`/group/${id}`);
        setGroup(data);
    }
    useEffect(()=>{
        getGroup(id)
    },[id])// eslint-disable-line react-hooks/exhaustive-deps
    return (  <div className="container">
      {!!group && <div className="row">
            <div className="col-6">
                <h4>{group.name}</h4>
                <p>{group.description}</p>
            </div>
            <div className="col-6">
                <img src={group.thumbnail_image} alt=""></img>
            </div>

        </div>}
    </div>);
}
 
export default GroupDetails;