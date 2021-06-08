import React from 'react'
import { useAuth } from './context/AuthContext';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom"

import NewGame from './component/NewGame'
import Signup from './component/Singup'
import Login from './component/Login'
import GameWrapper from './containers/GameWrapper'
import ForgotPassword from './component/ForgotPassword'
import Dashboard from './containers/Dashboard'
import GameRecapWrapper from './containers/GameRecapWrapper';
import PrivateRoute from './component/PrivateRoute'
import UpdateProfile from './component/UpdateProfile'
// import Downs from './component/Game/DownList'

import Navbar from './component/Navbar'
// import BottomNav from './containers/BottomNavigation'
//ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  appContainer: {
    paddingTop: "90px"
  }
});


function App() {
  const classes = useStyles(); 
  const {currentUser} = useAuth()

  return (
    <>
      {/* <AuthProvider> */}
        <Navbar></Navbar>
        <div  className={classes.appContainer}>
          <Router> 
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard}/>
              <PrivateRoute exact path="/new-game" component={NewGame}/>
              <PrivateRoute exact path="/game/:id" component={GameWrapper}/>
              <Route path="/recap/:id" component={GameRecapWrapper}/>
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/forgot" component={ForgotPassword}/>
              <Route path="/settings" component={UpdateProfile}/>
            </Switch>
              {currentUser ? (null
          // <BottomNav className={classes.BottomNav}></BottomNav>
          ) : null}
          </Router>
        </div>
        {/* </AuthProvider> */}
      </>
  );
}

export default App;
