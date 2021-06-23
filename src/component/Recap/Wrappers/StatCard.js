import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
      width: "100%",
      height: "100%",
      flexFlow: "column",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
});

export default function StatCard(props) {
    const classes = useStyles(); 
    return (
        <Grid item xs={12} md={6}>
            <Card className={classes.root}>
                <CardContent> 
                    {props.children}
                </CardContent>
            </Card>
        </Grid>
    )
}
