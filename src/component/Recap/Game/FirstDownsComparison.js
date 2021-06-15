import React from 'react'
import Chart  from 'react-apexcharts'
import StatCard from '../Wrappers/StatCard'
import SeriesMapper from '../../../helpers/Series'

export default function FirstDownsComparison(props) {
    const {game} = props
    const {downs} = game

    const playSeries = SeriesMapper(downs)

    let homeFirst = 0
    let awayFirsts = 0

    playSeries.map((series)=>{
      let possession = ""
      let firsts = series.filter((down)=>{
        possession = down.possession
        if (down.down === 1 && down.playType !== "KO" && down.playType !== "PAT"){
          return down
        }
      })

      if (firsts.length > 0){
        if (possession.toLowerCase() === "home"){
          homeFirst += firsts.length - 1
        } else if (possession.toLowerCase() === "away"){
          awayFirsts += firsts.length - 1
        }
      }
    })

    const  series = [{
      data: [homeFirst, awayFirsts]
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
