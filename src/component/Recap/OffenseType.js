import React from 'react'
import Chart  from 'react-apexcharts'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: "100%",
    },
});

export default function OffenseType(props) {
    const classes = useStyles(); 
    const {game, team} = props
    const {downs} = game

    const passingDowns = downs.filter((down)=>{
            if (down.possession.toLowerCase() === team && down.playType === "Pass"){
                return down
            }
        }) 
    
    const runningDowns = downs.filter((down)=>{
            if (down.possession.toLowerCase() === team && down.playType === "Run"){
                return down
            }
        }) 

    const runPrecentage = Math.round(passingDowns.length / (passingDowns.length + runningDowns.length) * 100)
    const passPrecentage = Math.round(runningDowns.length / (passingDowns.length + runningDowns.length) * 100)

    const series = [runPrecentage, passPrecentage]

    const options = {
            chart: {
            width: 380,
            type: 'pie',
            },
            labels: ["Run", "Pass"],
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
                <Typography variant="h5" component="h2">Run/Pass precentage</Typography>
                <Chart type="pie" options={options} series={series} width={500} height={320} />
            </CardContent>
        </Card>
    )
}
