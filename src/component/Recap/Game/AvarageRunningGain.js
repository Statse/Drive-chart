import React from 'react'
import Chart  from 'react-apexcharts'
import StatCard from '../Wrappers/StatCard'

export default function AvarageRunningGain(props) {
    const {game} = props
    const {downs} = game
    
    let totalYards = 0
    let totalHomePassingYards = 0
    let totalHomePassingDowns = 0
    let totalAwayPassingYards = 0
    let totalAwayPassingdowns = 0

    const plays = downs.filter((down)=>{
        if (down.result !== "Penalty" && (down.playType === "Run")){
            if (down.result !== "Turnover" && down.result !== "Fumble turnover" && down.result !== "Interception"){
                if (down.possession === "Home" ){
                  totalHomePassingYards += down.endYardline - down.startYardline
                  totalHomePassingDowns += 1
                }
                if (down.possession === "Away" ){
                  totalAwayPassingYards += down.endYardline - down.startYardline
                  totalAwayPassingdowns += 1
                }
                return totalYards += down.endYardline - down.startYardline
            }
        } 
    }) 
    
    const homeAvarageRunningGain =  Math.round((totalHomePassingYards / totalHomePassingDowns) * 10) / 10
    const awayAvarageRunningGain =  Math.round((totalAwayPassingYards / totalAwayPassingdowns) * 10) / 10

    const  series = [{
      data: [homeAvarageRunningGain, awayAvarageRunningGain]
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
        text: 'Avarage gain per running play',
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
