import React from 'react'
import Chart  from 'react-apexcharts'
import StatCard from '../Wrappers/StatCard'

export default function Possession(props) {
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
        name: game.home,
        data: homeScores
      }, {
        name: game.away,
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
      <StatCard>
        <Chart type="line" options={options} series={series} width={500} height={320} />
      </StatCard>
    )
}
