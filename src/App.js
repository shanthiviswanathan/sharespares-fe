import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-daterangepicker/daterangepicker.css';


import './assets/style.scss';

import HomePage from './pages/homepage/homepage.component';
import DashboardPage from './pages/dashboard/dashboard.component';

import CreateGroup from './components/create-group/create-group.component';
import GroupDetail from './components/group-detail/group-detail.component';

import CreateItem from './components/create-item/create-item.component';
import ItemDetail from './components/item-detail/item-detail.component';
import ProcessItem from './components/process-item/process-item.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import UserContext from './contexts/user.context'
import SearchItems from './components/Search/search.component'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
      groupId: null,
      groupChanged:false,
      itemChanged:false
    };
  }
  
  unsubscribeFromAuth = null;

  componentDidMount() {
    console.log('In Apps mount ', this.state.currentUser)
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        console.log('In Apps mount userAuth', userAuth)

        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
          console.log('In Apps mount after user', this.state);
        });
        this.setState({ currentUser: {id: userAuth.uid }});
      }
      else {
          this.setState({ currentUser: null });
      }
    });
  }

  componentWillUnmount() {
    console.log('In Apps unmount ', this.state.currentUser)
    this.unsubscribeFromAuth();
  }

  render() {
    console.log('In Apps render ', this.state.currentUser)
    return (
         <Router>
         <UserContext.Provider value={this.state.currentUser}>
         <div> 
           <Header />
           <main>
             <Switch>
                <Route path="/search/:query">
                  (<SearchItems />) </Route>
                <Route exact path='/' render = {() =>
                  this.state.currentUser? 
                  (<Redirect to = {{pathname: '/dashboard' }}/>) : 
                  (<HomePage/>) } />
                <Route exact path='/creategroup' 
                   render = {() => <CreateGroup currentUser={this.state.currentUser}/> }/> 
                <Route exact path='/managegroup/:groupId' 
                  render = {(props) => <GroupDetail groupId = {props.match.params.groupId} 
                   currentUser={this.state.currentUser}/> }/>
                <Route exact path='/createitem' 
                   render = {(props) => <CreateItem groupId = {-1} 
                   currentUser={this.state.currentUser}/> }/>       
                <Route exact path='/createitem/:groupId' 
                   render = {(props) => <CreateItem groupId = {props.match.params.groupId} 
                   currentUser={this.state.currentUser}/> }/>       
                <Route exact path='/manageitem/:itemId' 
                   render = {(props) => <ItemDetail itemId = {props.match.params.itemId} /> }/>
                <Route exact path='/processitem/:txnType/:itemId' 
                   render = {(props) => <ProcessItem txnType= {props.match.params.txnType} itemId = {props.match.params.itemId} 
                   currentUser={this.state.currentUser}/> }/>
        
                <Route exact path='/signin' render = {() =>
                   this.state.currentUser? 
                    (<Redirect to = {{pathname: '/dashboard' }}/>) : 
                    (<SignInAndSignUpPage/>) } />
                <Route exact path='/dashboard' 
                     render = {() => 
                    this.state.currentUser? (<DashboardPage currentUser={this.state.currentUser}/>) :
                    (<SignInAndSignUpPage/>) } />}/> }/>     
                </Switch>
              </main> 
      </div>
      </UserContext.Provider>
    </Router>
    );
  }
}

export default App;
