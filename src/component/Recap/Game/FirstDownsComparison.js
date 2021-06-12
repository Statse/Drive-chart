import React from 'react'
import Chart  from 'react-apexcharts'
import StatCard from '../Wrappers/StatCard'

export default function FirstDownsComparison(props) {
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
        <StatCard>
               <Chart type="bar" options={options} series={series} width={500} height={320} /> 
        </StatCard>
    )
}
