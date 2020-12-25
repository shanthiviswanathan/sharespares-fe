import React, { useContext, useEffect, useState } from 'react';
import { Link ,NavLink,useHistory} from "react-router-dom";
import UserContext from '../../UserContext';

let currentUser = {
  first_name: 'test',
  member_id: 'abc1',
  email: 'test@test.com',
}
// let otherUser = {
//   first_name: 'def',
//   member_id: 'def1',
//   email: 'deftest@test.com',
// }

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [query, setQuery] = useState('');
  let history = useHistory();

  const login = () => {
    setUser(currentUser)
    localStorage.setItem('user', JSON.stringify(currentUser));
  }
  const logout = () => {
    setUser(null)
    localStorage.clear();
    history.push("/");
  }
  useEffect(() => {
    let user = localStorage.getItem('user');
    setUser(JSON.parse(user))
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (

    <header>
      <nav className="navbar navbar-light justify-content-between">
        <Link to="/">Logo</Link>
        <div className="input-group w-50">
          <input 
          className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <div className="input-group-append">
            <Link to={`/search/${query}`} className="btn btn-home" type="button" id="button-addon2">Search</Link>
          </div>
        </div>
        <div className= "d-flex">
        <NavLink className="btn btn-link" exact to="/">Home</NavLink>
        {!user ?
          <button className="btn btn-home" onClick={() => login()}>Sign In</button> : <div className="d-inline" >
            <NavLink className="btn btn-link" exact to="/create">Create Group</NavLink>
            <NavLink className="btn btn-link" exact to="/create/item">Create Item</NavLink>
            <button className="btn btn-secondary" onClick={() => logout()}>Sign Out</button>
          </div>
        }

        </div>
      
      </nav>


    </header>

  );
}

export default NavBar;