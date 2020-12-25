import React,{useContext} from 'react';
import UserContext from '../UserContext';
import Dashboard from './Dashboard/Index'
const Home = () => {
    const { user } = useContext(UserContext);
    return (<>
      {!!user?
       <Dashboard/>
        :<div className="text-center mt-5"> welcome</div>}
   </>
    );
}
 
export default Home;