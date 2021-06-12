import React from 'react'
import Chart  from 'react-apexcharts'
import StatCard from '../Wrappers/StatCard';

export default function TouchdownTurnoverRatio(props) {
    const {game, team} = props
    const {downs} = game

    const touchdowns = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team && down.result === "TD"){
            return down
        }
    }) 
    
    const turnovers = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team && (down.result === "Turnover" || down.result === "Interception" || down.result === "Fumble turnover")){
            return down
        }
    }) 

    const touchdownPrecentage = Math.round(touchdowns.length / (touchdowns.length + turnovers.length) * 100)
    const turnverPrecentage = Math.round(turnovers.length / (touchdowns.length + turnovers.length) * 100)

    const series = [touchdownPrecentage, turnverPrecentage]

    const options = {
            chart: {
            width: 380,
            type: 'pie',
            },
            labels: ["Touchdown", "Turnover"],
            title: {
                text: 'TD/Turnover ratio',
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
