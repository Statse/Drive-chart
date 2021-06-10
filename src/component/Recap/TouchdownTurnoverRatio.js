import React from 'react'
import Chart  from 'react-apexcharts'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: "100%",
        flexFlow: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
});

export default function TouchdownTurnoverRatio(props) {
    const classes = useStyles(); 
    const {game, team} = props
    const {downs} = game

    const touchdowns = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team && down.result === "TD"){
            return down
        }
    }) 
    
    const turnovers = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team && (down.result === "Turnover" || down.result === "Interception" || down.result === "Fumble turnover")){
            return down
        }
    }) 

    const touchdownPrecentage = Math.round(touchdowns.length / (touchdowns.length + turnovers.length) * 100)
    const turnverPrecentage = Math.round(turnovers.length / (touchdowns.length + turnovers.length) * 100)

    const series = [touchdownPrecentage, turnverPrecentage]

    const options = {
            chart: {
            width: 380,
            type: 'pie',
            },
            labels: ["Touchdown", "Turnover"],
            responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
            }]
        }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.center} variant="h5" component="h2">TD/Turnover ratio</Typography>
                <Chart type="pie" options={options} series={series} width={500} height={320} />
            </CardContent>
        </Card>
    )
}
