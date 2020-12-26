import React, {useState, useContext, useEffect } from 'react';
import axios from 'axios';
import SearchResult from './search-results.component';
import { useParams } from "react-router-dom";
import UserContext from '../../contexts/user.context'

const Count = 10;
var currentUser;

const Search = () => {
    currentUser = useContext(UserContext);
    const [searchResults, setSearchResults] = useState([]);
    const { query } = useParams();


    const searchItems = async (query, start) => {
        const { data } = await axios.get('/api/items/search', {
            params: {
                searchQuery: query,
                start: start,
                count: Count
            }
        })
        
        if (start !== 0) {
            setSearchResults([...searchResults, ...data])
        } else {
            setSearchResults(data)
        }


    };

    useEffect(() => {
        searchItems(query, 0)
    }, [query]);

    const fetchNextItems = () => {
        searchItems(query, searchResults.length + 1)
    }
    return (

        <>
            {!!searchResults.length ? <SearchResult user={currentUser} items={searchResults} fetchNextItems={() => fetchNextItems()} /> :
                <div className="text-center mt-5"> <h3>No item found for your search</h3></div>}
        </>
    );
}

export default Search;