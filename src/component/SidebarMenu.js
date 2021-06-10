import React from 'react'
import {BrowserRouter as Router, Switch, Route } from "react-router-dom"

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListitemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ListSubheader } from '@material-ui/core';
import EventNoteIcon from '@material-ui/icons/EventNote';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});


function SidebarMenu() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    }); 

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            >
                <List>
                    <ListSubheader inset>Menu</ListSubheader>
                        {/* Link to = "" */}
                            <ListItem button>
                                <ListitemIcon>
                                    <EventNoteIcon />
                                </ListitemIcon>
                                <ListItemText primary="Testi 1" />
                            </ListItem>
                            <ListItem button>
                                <ListitemIcon>
                                    <EventNoteIcon />
                                </ListitemIcon>
                                <ListItemText primary="Testi 2" />
                            </ListItem>
                            <ListItem button>
                                <ListitemIcon>
                                    <EventNoteIcon />
                                </ListitemIcon>
                                <ListItemText primary="Testi 3" />
                            </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button>
                        <ListitemIcon>
                            <EventNoteIcon />
                        </ListitemIcon>
                        <ListItemText primary="Testi 4" />
                    </ListItem>
                    <ListItem button>
                        <ListitemIcon>
                            <EventNoteIcon />
                        </ListitemIcon>
                        <ListItemText primary="Testi 5" />
                    </ListItem>
                    <ListItem button>
                        <ListitemIcon>
                            <EventNoteIcon />
                        </ListitemIcon>
                        <ListItemText primary="Testi 6" />
                    </ListItem>
                </List>
            </div>
    );

    return (
        <div>
                {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton color="inherit" onClick={toggleDrawer(anchor, true)}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}

        </div>
    );
}

export default SidebarMenu

