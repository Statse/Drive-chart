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

export default function Penalties(props) {
    const classes = useStyles(); 
    const {game, team} = props
    const {downs} = game


    let offensivePenalties = 0
    let defensivePenalties = 0

    const penalties = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team){
            if (down.result === "Penalty" && (down.endYardline - down.startYardline < 0) ) {
                return offensivePenalties += 1
            }
        } else {
            if (down.result === "Penalty" && (down.endYardline - down.startYardline > 0)) {
                return defensivePenalties += 1
            }
        }
    })
    

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">Total penalties</Typography>
                <Typography variant="h4" component="p">{penalties.length}</Typography>
                <Typography variant="h5" component="h2">Offense penalties</Typography>
                <Typography variant="h4" component="p">{offensivePenalties}</Typography>
                <Typography variant="h5" component="h2">Defense penalties</Typography>
                <Typography variant="h4" component="p">{defensivePenalties}</Typography>
            </CardContent>
        </Card>
    )
}
