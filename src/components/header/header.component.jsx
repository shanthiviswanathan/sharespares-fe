import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/user.context'

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/loft.svg';

import './header.styles.scss';

const Header = () => {
  const currentUser = useContext(UserContext);
  const [query, setQuery] = useState('');

  return (

  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <form className="form-inline">
      <input className="form-control mr-sm-2" type="search"
         placeholder="Search"
         aria-label="Search"
         value={query}
         onChange={(e) => setQuery(e.currentTarget.value)} />
      <Link to={`/search/${query}`} className="btn btn-home">
        Search
      </Link>
    </form>
      {currentUser ? (
        <div className='options'>
          <Link className='option' to='/creategroup'>
            Create New Group
          </Link>
          <Link className='option' to='/createitem'>
            Create New Item
          </Link>
          <div className='option' onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        </div>
      ) : (
        <div className='options'>
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
        </div>
      )}
    </div>
  )
};

export default Header;