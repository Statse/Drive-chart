import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
// import AddIcon from '@material-ui/icons/Add';
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
  const setView = props.setView
  const submit = props.props
  const classes = useStyles();
  const [value, setValue] = React.useState('games');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Game" value="game" icon={<SportsFootballIcon />} onClick={()=>setView(`game`)} />
      <BottomNavigationAction label="Downs" value="downs" icon={<FormatListNumberedOutlinedIcon />}  onClick={()=>setView(`downs`)}  />
      <Tooltip form='game-form' title="Add" aria-label="add" className={classes.addButton}>
        <button onClick={submit} form='game-form' style={{background: "none", border: "none",}}>
          <Fab color="primary">
            <SaveOutlinedIcon />
          </Fab>
        </button>
      </Tooltip>
    </BottomNavigation>
  );
}