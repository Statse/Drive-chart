import React from 'react'
import Chart  from 'react-apexcharts'

export default function Possession(props) {
    console.log("Possession")
    const {game} = props

    const homeDowns = game.downs.filter((down)=>{
            if (down.possession === "Home"){
                return down
            }
        }) 
    
    const awayDowns = game.downs.filter((down)=>{
            if (down.possession === "Away"){
                return down
            }
        }) 

    const awayPossessionPrecentage = Math.round(awayDowns.length / (homeDowns.length + awayDowns.length) * 100)
    const homePossessionPrecentage = Math.round(homeDowns.length / (homeDowns.length + awayDowns.length) * 100)

    // const series= [{
    //     name: 'series-1',
    //     data: [homePossessionPrecentage, awayPossessionPrecentage]
    //   },
    // ]
  
    // const options = {
    //     chart: {
    //         width: 380,
    //         type: 'pie',
    //     },
    //     labels: [game.home, game.away],
    //     responsive: [{
    //     breakpoint: 480,
    //     options: {
    //       chart: {
    //         width: 200
    //       },
    //       legend: {
    //         position: 'bottom'
    //       }
    //     }
    //   }]
    // }

   const series = [homePossessionPrecentage, awayPossessionPrecentage]

   const options = {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: [game.home, game.away],
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
        }]
      }

    return (
        <>
            <h3>Possession</h3>
            <Chart type="pie" options={options} series={series} width={500} height={320} />
        </>
    )
}
