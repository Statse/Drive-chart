import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import SettingsIcon from '@material-ui/icons/Settings';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles({
  root: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%"
  },
  addButton: {
      position: "absolute",
      bottom: "28px"
  }
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('games');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Games" value="games" icon={<SportsFootballIcon />} />
      <BottomNavigationAction label="Favorites" value="favorites" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Nearby" value="nearby" icon={<FolderIcon />} />
      <BottomNavigationAction label="Settings" value="folder" icon={<SettingsIcon />} />
      <Tooltip title="Add" aria-label="add" className={classes.addButton}>
        <Fab color="primary">
          <AddIcon />
        </Fab>
      </Tooltip>
    </BottomNavigation>
  );
}