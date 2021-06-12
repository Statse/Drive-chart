import React from 'react'
import Chart  from 'react-apexcharts'
import StatCard from '../Wrappers/StatCard'

export default function OffenseType(props) {
    const {game, team} = props
    const {downs} = game

    const passingDowns = downs.filter((down)=>{
            if (down.possession.toLowerCase() === team && down.playType === "Pass"){
                return down
            }
        }) 
    
    const runningDowns = downs.filter((down)=>{
            if (down.possession.toLowerCase() === team && down.playType === "Run"){
                return down
            }
        }) 

    const runPrecentage = Math.round(passingDowns.length / (passingDowns.length + runningDowns.length) * 100)
    const passPrecentage = Math.round(runningDowns.length / (passingDowns.length + runningDowns.length) * 100)

    const series = [runPrecentage, passPrecentage]

    const options = {
            chart: {
            width: 380,
            type: 'pie',
            },
            labels: ["Run", "Pass"],
            title: {
                text: 'Run/Pass ratio',
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
