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


    let passingYards = 0

    const passes = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team && down.playType === "Pass" && down.result !== "Penalty"){
            passingYards += down.endYardline - down.startYardline
            return down
        }
    }) 
    
    const avaragePassYards =  Math.round((passingYards / passes.length) * 10) / 10

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">Total passing yards</Typography>
                <Typography variant="h4" component="p">{passingYards}</Typography>
                <Typography variant="h5" component="h2">Attempts</Typography>
                <Typography variant="h4" component="p">{passes.length}</Typography>
                <Typography variant="h5" component="h2">Pass yards per attempt</Typography>
                <Typography variant="h4" component="p">{avaragePassYards}</Typography>
            </CardContent>
        </Card>
    )
}
