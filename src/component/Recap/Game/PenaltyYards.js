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

export default function PenaltyYards(props) {
    const classes = useStyles(); 
    const {game} = props
    const {downs} = game

    const homeFirstDowns = downs.filter((down)=>{
        if (down.possession === "Home" && down.down === 1){
            return down
        }
    }) 
    
    let totalPenaltyYards = 0
    let homePenaltyYards = 0
    let awayPenaltyYards = 0

    const plays = downs.filter((down)=>{
        if (down.result !== "Penalty" && (down.playType === "Run" || down.playType === "Pass")){
            if (down.result !== "Turnover" && down.result !== "Fumble turnover" && down.result !== "Interception"){
                if (down.possession === "Home" ){
                  homePenaltyYards += down.endYardline - down.startYardline
                }
                if (down.possession === "Away" ){
                  awayPenaltyYards += down.endYardline - down.startYardline
                }
                return totalPenaltyYards += down.endYardline - down.startYardline
            }
        } 
    }) 

    const  series = [{
      data: [homePenaltyYards, awayPenaltyYards]
    }]

    const options = {
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
      }],
      title: {
        text: 'Total yards',
        align: 'left'
      },
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function(chart, w, e) {
          }
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [
          [game.home],
          [game.away],
        ],
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      }
    }

    return (
        <Card className={classes.root}>
            <CardContent>
               <Chart type="bar" options={options} series={series} width={500} height={320} /> 
            </CardContent>
        </Card>
    )
}
