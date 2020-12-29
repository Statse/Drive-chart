import React from 'react';
import { useHistory } from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
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

export default function GameBottomNav(props) {
  const gameId = props.gameId
  const setView = props.setView
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
      <BottomNavigationAction label="Game" value="game" icon={<SportsFootballIcon />} onClick={()=>setView(`game`)} />
      <BottomNavigationAction label="Downs" value="downs" icon={<FormatListNumberedOutlinedIcon />}  onClick={()=>setView(`downs`)}  />
      <Tooltip title="Add" aria-label="add" className={classes.addButton} onClick={()=>console.log("lol")}>
          <Fab color="primary">
            <SaveOutlinedIcon />
          </Fab>
      </Tooltip>
    </BottomNavigation>
  );
}