import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    card: {
        display:"flex",
        flexFlow:"column"
    }
});

export default function Score(props) {
    const classes = useStyles(); 
    const {game} = props

    return (
        <Card className={classes.root}>
            <CardContent className={classes.card}>
                <div>{game.home} - {game.homeScore}</div>
                <div>{game.away} - {game.awayScore}</div>
            </CardContent>
        </Card>
    )
}
