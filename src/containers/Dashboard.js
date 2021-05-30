import React from 'react'

//components
import GamesList from '../component/GamesList'
import BottomNav from '../containers/BottomNavigation'

//material ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
    //   padding: "15px",
    //   maxWidth: "1000px",
    //   maxHeight: "1000px",
    //   width: "100%",
    },
  }));

export default function Dashboard() {
    const classes = useStyles();

    return (
    <>
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <GamesList/>
                </Grid>
            </Grid>
        </div>
        <BottomNav/>
    </>
    )
}
