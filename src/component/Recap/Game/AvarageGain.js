import React from 'react'
import Chart  from 'react-apexcharts'
import StatCard from '../Wrappers/StatCard'

export default function AvarageGain(props) {
    const {game} = props
    const {downs} = game
    
    let totalYards = 0
    let totalHomeYards = 0
    let totalHomeDowns = 0
    let totalAwayYards = 0
    let totalAwaydowns = 0

    const plays = downs.filter((down)=>{
        if (down.result !== "Penalty" && (down.playType === "Run" || down.playType === "Pass")){
            if (down.result !== "Turnover" && down.result !== "Fumble turnover" && down.result !== "Interception"){
                if (down.possession === "Home" ){
                  totalHomeYards += down.endYardline - down.startYardline
                  totalHomeDowns += 1
                }
                if (down.possession === "Away" ){
                  totalAwayYards += down.endYardline - down.startYardline
                  totalAwaydowns += 1
                }
                return totalYards += down.endYardline - down.startYardline
            }
        } 
    }) 
    
    const homeAvarageGain =  Math.round((totalHomeYards / totalHomeDowns) * 10) / 10
    const awayAvarageGain =  Math.round((totalAwayYards / totalAwaydowns) * 10) / 10

    const  series = [{
      data: [homeAvarageGain, awayAvarageGain]
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
        text: 'Avarage gain per play',
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
