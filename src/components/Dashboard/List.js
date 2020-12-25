import React, { useEffect,useState,useContext } from 'react';
import { useParams } from "react-router-dom";
import UserContext from '../../UserContext';
import Item from './DashboardItem'
import axios from 'axios';
import useInfiniteScroll from "../Common/InfinteScroll";

const COUNT=10;
const ItemsList = () => {
    const [items,setItems]=useState([])
    const { slug } = useParams();
    const { user } = useContext(UserContext);
 
    const fetchData = async (start,count,slug) => {
        const { data } = await axios.get('/my-items', {
            params: {
                member_id: user.member_id,
                item_type: slug,
                start: start,
                count: count
            }
        })
        if (start !== 0) {
            setItems([...items, ...data])
        } else {
            setItems(data)
        }
    }


        useEffect(() => {
            if(!!user && !!user.member_id){
            fetchData(0,10,slug);
            }
        },[slug,user])// eslint-disable-line react-hooks/exhaustive-deps

   
        
        const fetchMoreListItems=()=>{
            fetchData(items.length+1,COUNT,slug)
        }
        useInfiniteScroll(fetchMoreListItems);
    return ( <div className="container">
       {!!items.length && items.map((item,i)=><Item
        item={item} key={i} btn={'Return'} 
        btnType={slug==='borrowed'?'btn':'dropdown'} 
        onSubmit={() => console.log('hello')} 
        member_id={user.member_id}
        setReloadItems={()=>fetchData(0,10,slug)}
        itemType={slug}
        />
       )}  
    </div> );
}
 
export default ItemsList;