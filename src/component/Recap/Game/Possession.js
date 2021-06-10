import React from 'react'
import Chart  from 'react-apexcharts'
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

export default function Possession(props) {
    const classes = useStyles(); 
    const {game} = props
    const {downs} = game

    const homeDowns = downs.filter((down)=>{
            if (down.possession === "Home"){
                return down
            }
        }) 
    
    const awayDowns = downs.filter((down)=>{
            if (down.possession === "Away"){
                return down
            }
        }) 

    const awayPossessionPrecentage = Math.round(awayDowns.length / (homeDowns.length + awayDowns.length) * 100)
    const homePossessionPrecentage = Math.round(homeDowns.length / (homeDowns.length + awayDowns.length) * 100)

    const series = [homePossessionPrecentage, awayPossessionPrecentage]

    const options = {
            chart: {
            width: 380,
            type: 'pie',
            },
            labels: [game.home, game.away],
            title: {
                text: 'Possession',
                align: 'left'
            },
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
                <Chart type="pie" options={options} series={series} width={500} height={320} />
            </CardContent>
        </Card>
    )
}
