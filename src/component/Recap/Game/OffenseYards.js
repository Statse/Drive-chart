import React from 'react'
import Chart  from 'react-apexcharts'
import StatCard from '../Wrappers/StatCard'

export default function OffenseYards(props) {
    const {game} = props
    const {downs} = game

    const homeFirstDowns = downs.filter((down)=>{
        if (down.possession === "Home" && down.down === 1){
            return down
        }
    }) 
    
    let totalYards = 0
    let totalHomeYards = 0
    let totalAwayYards = 0

    const plays = downs.filter((down)=>{
        if (down.result !== "Penalty" && (down.playType === "Run" || down.playType === "Pass")){
            if (down.result !== "Turnover" && down.result !== "Fumble turnover" && down.result !== "Interception"){
                if (down.possession === "Home" ){
                  totalHomeYards += down.endYardline - down.startYardline
                }
                if (down.possession === "Away" ){
                  totalAwayYards += down.endYardline - down.startYardline
                }
                return totalYards += down.endYardline - down.startYardline
            }
        } 
    }) 

    const  series = [{
      data: [totalHomeYards, totalAwayYards]
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
     
      <StatCard>
               <Chart type="bar" options={options} series={series} width={500} height={320} /> 
      </StatCard>
    )
}
