import React from 'react'
import Chart  from 'react-apexcharts'
import StatCard from '../Wrappers/StatCard'

export default function ReceiverSeparation(props) {
    const {game, team} = props
    const {downs} = game


    //Count how many times each receiver got the ball

    let passingYards = 0
    let interceptions = 0
    let incompletions = 0
    let fumbles = 0

    const passes = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team){
            if (down.playType === "Pass"  && down.result !== "Penalty"){
                if (down.result ===  "Interception"){
                    interceptions += 1
                } else if (down.result === "Turnover" && down.result === "Fumble turnover"){
                    fumbles += 1
                } else if (down.result ===  "Incomplete"){
                    incompletions += 1
                }else {
                    passingYards += down.endYardline - down.startYardline
                }
                return down
            }
        }
    }) 

    const series = [ 
        {
            name: "Screen",
            data: [{
                x: 'L',
                y: 43
            }, {
                x: 'R',
                y: 43
            }, {
                x: 'M',
                y: 43
            }]
        },
        {
        name: "Short",
        data: [{
            x: 'L',
            y: 43
          }, {
            x: 'R',
            y: 43
          }, {
            x: 'M',
            y: 43
          }]
      },
      {
        name: "Med",
        data: [{
            x: 'L',
            y: 43
          }, {
            x: 'R',
            y: 43
          }, {
            x: 'M',
            y: 43
          }]
      },
      {
        name: "Long",
        data: [{
          x: 'L',
          y: 43
        }, {
          x: 'R',
          y: 43
        }, {
          x: 'M',
          y: 43
        }]
      }]
      
      const options = {
        chart: {
          height: 350,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#008FFB"],
        title: {
          text: 'HeatMap Chart (Single color)'
        },
      }

    return (
        <StatCard>
            <Chart options={options} series={series} type="heatmap" height={350} />
        </StatCard>
    )
}
