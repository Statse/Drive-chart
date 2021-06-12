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

export default function DownConversion(props) {
    const classes = useStyles(); 
    const {game, team} = props
    const {downs} = game

    const conversion = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team){
        }
    })
    

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">Conversion</Typography>
            </CardContent>
        </Card>
    )
}
