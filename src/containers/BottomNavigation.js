import React from 'react';
import { useHistory } from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from '@material-ui/icons/Settings';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%"
  },
  addButton: {
      position: "absolute",
      bottom: "28px"
  }
});

export default function BottomNav() {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState('games');

  function handleLink(link) {
    history.push(link);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Games" value="games" icon={<SportsFootballIcon />} onClick={()=>handleLink("/")} />
      <BottomNavigationAction label="Settings" value="settings" icon={<SettingsIcon />} onClick={()=>handleLink("/settings")} />
      <Tooltip title="Add" aria-label="add" className={classes.addButton} onClick={()=>handleLink("/new-game")}>
          <Fab color="primary">
            <AddIcon />
          </Fab>
      </Tooltip>
    </BottomNavigation>
  );
}