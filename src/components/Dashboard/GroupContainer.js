import React, { useEffect, useContext, useState } from 'react';

import UserContext from '../../UserContext';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import Group from './Group';
import useInfiniteScroll from "../Common/InfinteScroll";
const COUNT = 10;
const GroupContainer = () => {
    const [items, setItems] = useState([]);
    const [dashboardLocation, setDashboardLocation] = useState(true);
    const { user } = useContext(UserContext);
    const location = useLocation();

    const fetchGroup = async (start, count) => {
        const { data } = await axios.get('/groups', {
            params: {
                member_id: user.member_id,
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
        setDashboardLocation(!location.pathname.includes('groups'))
        if (!location.pathname.includes('groups') && user && user.member_id) {
            fetchGroup(0, 6)
        }
        if (!!location.pathname.includes('groups') && user && user.member_id) {
            fetchGroup(0, 10)
        }
    }, [user,location.pathname])// eslint-disable-line react-hooks/exhaustive-deps



    const fetchMoreListItems = () => {
        if (!dashboardLocation) {
            fetchGroup(items.length + 1, COUNT)
        }
    }
    useInfiniteScroll(fetchMoreListItems);

    return (<div className="p-3">
        {!!items.length && <div className={`${!dashboardLocation ? 'container' : ''}`}>
            <div className="row mb-3">
                <h4 className="col-lg-9">My Groups</h4>
                {items.length > 5 && dashboardLocation && <Link className="col-lg-3 text-right" to='/groups' >Show more </Link>
                }
            </div>
            <Group groups={dashboardLocation ? items.slice(0, 5) : items} />
        </div>
        }

    </div>);
}

export default GroupContainer;