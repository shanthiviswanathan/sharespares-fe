import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-daterangepicker/daterangepicker.css';
import React,{useState,useMemo} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import UserContext from "./UserContext";
import Search from './components/Search/Search'
import Details from './components/Search/Details'
import Home from './components/Home'
import MyList from './components/Dashboard/List'
import Groups from './components/Dashboard/GroupContainer'
import NavBar from "./components/Common/Navbar";
import Form from './components/Common/Form';
import GroupDetails from './components/Dashboard/GroupDetails';
import './assets/style.scss'
export default function App() {
  const [user,setUser]=useState(null);
  const providerValue=useMemo(()=>({user,setUser}),[user,setUser])
 return (
    <Router>
        <UserContext.Provider value={providerValue}>
      <div>
        
   <NavBar/>
   <main>
        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/myitems/:slug" exact>
            <MyList />
          </Route>
          <Route path="/search/:query">
          <Search />
          </Route>
          <Route path="/details/:id">
            <Details />
          </Route>
          <Route exact path="/create/:type/:groupId?">
            < Form/>
          </Route>
          <Route exact path="/edit/:type/:itemId">
            < Form/>
          </Route>
          <Route exact path="/clone/:type/:itemId">
            < Form/>
          </Route>
          <Route  exact path="/groups">
          < Groups/>
          </Route>
          <Route path="/group/:id">
          <GroupDetails />
          </Route>
        </Switch>
        </main>
      </div>
      </UserContext.Provider>
    </Router>
  );
}
