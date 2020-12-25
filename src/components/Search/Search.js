import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchResult from './SearchResult';
import { useParams } from "react-router-dom";

const Count = 10;

const Home = () => {
    const [searchResults, setSearchResults] = useState([]);
    const { query } = useParams();


    const search = async (query, start) => {
        const { data } = await axios.get('/search', {
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
        search(query, 0)
    }, [query]);// eslint-disable-line react-hooks/exhaustive-deps

    const fetchNextItems = () => {
        search(query, searchResults.length + 1)
    }
    return (

        <>
            {!!searchResults.length ? <SearchResult items={searchResults} fetchNextItems={() => fetchNextItems()} /> :
                <div className="text-center mt-5"> <h3>No item found for your search</h3></div>}
        </>
    );
}

export default Home;