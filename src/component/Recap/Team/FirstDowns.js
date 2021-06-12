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

export default function FirstDowns(props) {
    const classes = useStyles(); 
    const {game, team} = props
    const {downs} = game

    const firstDowns = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team){
            if (down.playType !== "KO"){
                if (down.down === 1){
                    return down.down
                }
            }
        }
    })
    

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">First downs</Typography>
                <Typography variant="h4" component="p">{firstDowns.length}</Typography>
            </CardContent>
        </Card>
    )
}
