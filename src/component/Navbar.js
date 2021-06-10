import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

//ui
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { useAuth } from '../context/AuthContext'

import SidebarMenu from '../component/SidebarMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const {currentUser, logout} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()


  async function handleLogout() {
      setError("")
      try {
          await logout()
          history.push("/login")
      } catch(e) {
          setError(e)
          console.log(error)
          setLoading(false)
          return alert(error)
      }
  } 


  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <SidebarMenu
          open={open}
          handleDrawerClose={handleDrawerClose}
          />
          {/*<IconButton edge="start" onClick={handleDrawerOpen} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          */}
          <Typography variant="h6" className={classes.title}>
            Drive chart
          </Typography>
          {currentUser ? (
            <Button disabled={loading} onClick={handleLogout} color="inherit">Logout</Button>
          ) : (
            null
            // <Button color="inherit">Login</Button>
          )}

        </Toolbar>

      </AppBar>
      

    </div>
  );
}
