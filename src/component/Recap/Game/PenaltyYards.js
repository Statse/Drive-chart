import React from 'react'
import Chart  from 'react-apexcharts'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import StatCard from '../Wrappers/StatCard'

export default function PenaltyYards(props) {
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
        if (down.result === "Penalty"){
            let penaltyYards = 0
            if (down.endYardline - down.startYardline < 0) {
              //offensive penalty
              penaltyYards += (down.endYardline - down.startYardline) * -1
              if (down.possession === "Home"){
                homePenaltyYards += penaltyYards
              }
              if (down.possession === "Away" ){
                awayPenaltyYards += penaltyYards
              }

            } else if  (down.endYardline - down.startYardline > 0){
              //defensive penalty
              penaltyYards += (down.endYardline - down.startYardline)
              if (down.possession === "Home"){
                awayPenaltyYards += penaltyYards
              }
              if (down.possession === "Away" ){
                homePenaltyYards += penaltyYards
              }
            }
              return totalPenaltyYards += penaltyYards
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
        text: 'Penalty yards',
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
