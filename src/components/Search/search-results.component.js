import React from 'react';
import { Link } from "react-router-dom";
//import useInfiniteScroll from "./InfinteScroll";

const SearchResult = ({ user, items ,fetchNextItems}) => {
 
 //   const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

    const getVisibleItems = () => {
        if (!!!user) {
            let a = items.filter(item => item.visibility !== 'PRIVATE')
            return a
        } else return items;
    }

    //function fetchMoreListItems() {
    //    fetchNextItems();
    //  }
    return (

        <div className="container search-conteiner mt-5">
            { !!getVisibleItems().length && getVisibleItems().map(item => <div className="row border-bottom p-3 mt-3" key={item.item_id}>
                <div className="col">
                    <Link to={`/manageitem/${item.item_id}`}> <h2>{item.title}</h2></Link>
                    <h5>{item.subtitle}</h5>
                    <hr />
                    <h5>Description:</h5>
                    <p>{item.description}</p>
                </div>
                <div className="col">
                    <Link to={`/details/${item.item_id}`}>
                        <img className="d-block w-100" src={item.thumbnail_image||''} alt={item.title}></img>
                    </Link>

                </div>
            </div>)

            }
            {!getVisibleItems().length&&<div className="text-center">
            <h3>No item found for your search</h3>
            </div>}
    

        </div>);
}

export default SearchResult;