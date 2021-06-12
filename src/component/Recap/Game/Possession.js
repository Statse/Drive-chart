import React from 'react'
import Chart  from 'react-apexcharts'
import StatCard from '../Wrappers/StatCard'

export default function Possession(props) {
    const {game} = props
    const {downs} = game

    const homeDowns = downs.filter((down)=>{
            if (down.possession === "Home"){
                return down
            }
        }) 
    
    const awayDowns = downs.filter((down)=>{
            if (down.possession === "Away"){
                return down
            }
        }) 

    const awayPossessionPrecentage = Math.round(awayDowns.length / (homeDowns.length + awayDowns.length) * 100)
    const homePossessionPrecentage = Math.round(homeDowns.length / (homeDowns.length + awayDowns.length) * 100)

    const series = [homePossessionPrecentage, awayPossessionPrecentage]

    const options = {
            chart: {
            width: 380,
            type: 'pie',
            },
            labels: [game.home, game.away],
            title: {
                text: 'Possession',
                align: 'left'
            },
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
  
        <StatCard>
                <Chart type="pie" options={options} series={series} width={500} height={320} />
        </StatCard>
    )
}
