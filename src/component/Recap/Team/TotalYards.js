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

    let totalYards = 0
    let turnovers = 0

    const plays = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team ){
            if (down.result !== "Penalty" && (down.playType === "Run" || down.playType === "Pass")){
                if (down.result !== "Turnover" && down.result !== "Fumble turnover" && down.result !== "Interception"){
                    totalYards += down.endYardline - down.startYardline
                } else {
                    turnovers += 1
                }
                return down
            } 
        }
    }) 
    
    const avarageYards =  Math.round((totalYards / plays.length) * 10) / 10

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">Total yards</Typography>
                <Typography variant="h4" component="p">{totalYards}</Typography>
                <Typography variant="h5" component="h2">Total plays</Typography>
                <Typography variant="h4" component="p">{plays.length}</Typography>
                <Typography variant="h5" component="h2">Pass yards per play</Typography>
                <Typography variant="h4" component="p">{avarageYards}</Typography>
                <Typography variant="h5" component="h2">Turnovers</Typography>
                <Typography variant="h4" component="p">{turnovers}</Typography>
            </CardContent>
        </Card>
    )
}
