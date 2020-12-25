import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import Item from '../Common/Item'
import useInfiniteScroll from "../Common/InfinteScroll";

const SearchResult = ({ items ,fetchNextItems}) => {
    const { user } = useContext(UserContext);
 
    // const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
    useInfiniteScroll(fetchMoreListItems);

    const getVisibleItems = () => {
        if (!!!user) {
            let a = items.filter(item => item.visibility !== 'PRIVATE')
            return a
        } else return items;
    }

    function fetchMoreListItems() {
        fetchNextItems();
      }
    return (

        <div className="container search-conteiner mt-5">
            { !!getVisibleItems().length && getVisibleItems().map(item => 
            <Item item={item}/>
            )}
            {!getVisibleItems().length&&<div className="text-center">
            <h3>No item found for your search</h3>
            </div>}
    

        </div>);
}

export default SearchResult;