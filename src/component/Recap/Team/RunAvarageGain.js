import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


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

export default function PassAvarageGain(props) {
    const classes = useStyles(); 
    const {game, team} = props
    const {downs} = game


    let runningYards = 0
    let turnovers = 0

    const runningPlays = downs.filter((down)=>{
        if (
            down.playType.toLowerCase() !== "run" 
         || down.result === "Penalty"
            ){
            return
        }

        if (
        down.possession.toLowerCase() === team 
        && down.result !== "Turnover"
        && down.result !== "Fumble turnover"
        ){
            runningYards += down.endYardline - down.startYardline
            return down
        } else if (
           down.result === "Turnover"
        || down.result === "Fumble turnover"
        ){
            turnovers += 1
        }
    }) 
    
    const avarageRunYards =  Math.round((runningYards / runningPlays.length) * 10) / 10

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">Total running yards</Typography>
                <Typography variant="h4" component="p">{runningYards}</Typography>
                <Typography variant="h5" component="h2">Run attempts</Typography>
                <Typography variant="h4" component="p">{runningPlays.length}</Typography>
                <Typography variant="h5" component="h2">Run yards per attempt</Typography>
                <Typography variant="h4" component="p">{avarageRunYards}</Typography>
                <Typography variant="h5" component="h2">Running play turnovers</Typography>
                <Typography variant="h4" component="p">{turnovers}</Typography>
            </CardContent>
        </Card>
    )
}
