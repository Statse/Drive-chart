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

    let homeScores = []
    let awayScores = []
    let quarters = []

    downs.map((down)=>{
        homeScores[down.quarter-1] = down.homeScore
        awayScores[down.quarter-1] = down.awayScore
        quarters[down.quarter-1] = down.quarter
    }) 

    if (quarters.length > 4){
        quarters[4] = "OT"
    }

    const biggestScore = homeScores[quarters.length-1] > awayScores[quarters.length-1] ? homeScores[quarters.length-1] : awayScores[quarters.length-1]

    const series =[{
        name: 'Home',
        data: homeScores
      }, {
        name: 'Away',
        data: awayScores
      }]

    const options = {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: 'Scoring summary',
          align: 'left'
        },
        legend: {
          tooltipHoverFormatter: function(val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
          }
        },
        xaxis: {
          categories: quarters,
        },
        yaxis: {
            min: 0,
            max: biggestScore+7,
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                width: 350
              },
                legend: {
                position: 'bottom'
              }
            }
          },
          {
            breakpoint: 400,
            options: {
                chart: {
                width: 300
              },
                legend: {
                position: 'bottom'
              }
            }
          },
          {
            breakpoint: 350,
            options: {
              chart: {
              width: 280
            },
              legend: {
              position: 'bottom'
            }
          }
          }
        ]
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Chart type="line" options={options} series={series} width={500} height={320} />
            </CardContent>
        </Card>
    )
}
