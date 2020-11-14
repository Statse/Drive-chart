import React from 'react'
import { AuthProvider } from './context/AuthContext';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom"


import Signup from './component/Singup'
import Login from './component/Login'
import ForgotPassword from './component/ForgotPassword'
import Dashboard from './component/Dashboard'
import PrivateRoute from './component/PrivateRoute'
import UpdateProfile from './component/UpdateProfile'

import Navbar from './component/Navbar'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  appGrid: {
    minHeight: "100vh",
  },
});


function App() {
  const classes = useStyles(); 

  return (
    <>
      <Navbar></Navbar>
        <Grid
        container
        className={classes.appGrid}
        direction="column"
        justify="center"
        alignItems="center"
        >
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard}/>
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/forgot" component={ForgotPassword}/>
              <Route path="/update-profile" component={UpdateProfile}/>
            </Switch>
          </AuthProvider>
        </Router>
        </Grid>
      </>
  );
}

export default App;
