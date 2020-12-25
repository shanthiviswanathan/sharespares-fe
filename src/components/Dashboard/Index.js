import React from 'react';
import OwnedList from './OwnedList';
import Group from './GroupContainer';

const Dashboard = () => {
    return ( <div className="container">
        <div className="row">
            <div className="col-lg-6 ">
            <OwnedList/>
            </div>
            <div className="col-lg-6">
           <Group/>
            </div>
        </div>   
    </div> );
}
 
export default Dashboard;