import React from 'react'
import Chart  from 'react-apexcharts'
import StatCard from '../Wrappers/StatCard'

export default function RunningYardsComparison(props) {
    const {game} = props
    const {downs} = game
    
    let totalRunningYards = 0
    let totalHomeRunningYards = 0
    let totalAwayRunningYards = 0

    const plays = downs.filter((down)=>{
        if (down.result !== "Penalty" && (down.playType === "Run")){
            if (down.result !== "Turnover" && down.result !== "Fumble turnover" && down.result !== "Interception"){
                if (down.possession === "Home" ){
                  totalHomeRunningYards += down.endYardline - down.startYardline
                }
                if (down.possession === "Away" ){
                  totalAwayRunningYards += down.endYardline - down.startYardline
                }
                return totalRunningYards += down.endYardline - down.startYardline
            }
        } 
    }) 

    const  series = [{
      data: [totalHomeRunningYards, totalAwayRunningYards]
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
        text: 'Running yards',
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
