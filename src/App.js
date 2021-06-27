import React from 'react'
import { useAuth } from './context/AuthContext';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom"


import NewGame from './component/NewGame'
import Signup from './component/Singup'
import Login from './component/Login'

import ForgotPassword from './component/ForgotPassword'

import Dashboard from './containers/Dashboard'
import GameRecapWrapper from './containers/GameRecapWrapper';

import GameRecapPublicWrapper from './containers/GameRecapPublicWrapper'
import PlayerRecapWrapper from './containers/PlayerRecapWrapper';
import PlayerRecapPublicWrapper from './containers/PlayerRecapPublicWrapper'

import PrivateRoute from './component/PrivateRoute'
import UpdateProfile from './component/UpdateProfile'

import Navbar from './component/Navbar'
import { makeStyles } from '@material-ui/core/styles';


import {GameProvider} from './context/GameContext'
import Game from './containers/Game'

const useStyles = makeStyles({
  appContainer: {
    paddingTop: "90px"
  }
});


function App() {
  const classes = useStyles(); 
  const {currentUser} = useAuth()

  return (
        <Router> 
          <Navbar></Navbar>
            <div  className={classes.appContainer}>
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard}/>
                  <PrivateRoute exact path="/new-game" component={NewGame}/>
                  <GameProvider>
                    <PrivateRoute exact path="/game/:id" component={Game}/>
                    <PrivateRoute exact path="/recap/:id" component={GameRecapWrapper}/>
                    <PrivateRoute exact path="/recap/:id/player/:team/:player" component={PlayerRecapWrapper}/>
                  </GameProvider>

                  <Route exact path="/public/recap/:id" component={GameRecapPublicWrapper}/>
                  <Route exact path="/public/recap/:id/player/:team/:player" component={PlayerRecapPublicWrapper}/>
                  <Route path="/login" component={Login}/>
                  <Route path="/signup" component={Signup}/>
                  <Route path="/forgot" component={ForgotPassword}/>
                  <Route path="/settings" component={UpdateProfile}/>
                </Switch>
                  {currentUser ? (null
              // <BottomNav className={classes.BottomNav}></BottomNav>
              ) : null}
            </div>
        </Router>
  );
}

export default App;
