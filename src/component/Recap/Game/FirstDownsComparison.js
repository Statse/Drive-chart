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

export default function FirstDownsComparison(props) {
    const classes = useStyles(); 
    const {game} = props
    const {downs} = game

    const homeFirstDowns = downs.filter((down)=>{
        if (down.possession === "Home" && down.down === 1){
            return down
        }
    }) 

    const awayFirstDowns = downs.filter((down)=>{
        if (down.possession === "Away" && down.down === 1){
            return down
        }
    }) 

    console.log("homeFirstDowns", homeFirstDowns)
    console.log("awayFirstDowns", awayFirstDowns)

    const  series = [{
      data: [homeFirstDowns.length, awayFirstDowns.length]
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
        text: 'First downs',
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
