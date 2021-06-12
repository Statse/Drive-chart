import React from 'react'
import Chart  from 'react-apexcharts'
import StatCard from '../Wrappers/StatCard'

export default function CompletionPrecentage(props) {
    const {game, team} = props
    const {downs} = game

    const completions = downs.filter((down)=>{
            if (down.possession.toLowerCase() === team && down.playType === "Pass" && down.result.toLowerCase() !== "incomplete"){
                return down
            }
        }) 
    
    const incompletions = downs.filter((down)=>{
            if (down.possession.toLowerCase() === team && down.playType === "Pass"  && down.result.toLowerCase() === "incomplete"){
                return down
            }
        }) 

    const interceptions = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team && down.playType === "Pass"  && (down.result.toLowerCase() === "interception")){
            return down
        }
    }) 
    

    const completePrecentage = Math.round(completions.length / (completions.length + incompletions.length + interceptions.length) * 100)
    const incompletePrecentage = Math.round(incompletions.length / (completions.length + incompletions.length + interceptions.length) * 100)
    const interceptionPrecentage = Math.round(interceptions.length / (completions.length + incompletions.length + interceptions.length) * 100)
    const series = [completePrecentage, incompletePrecentage, interceptionPrecentage]

    const options = {
            chart: {
            width: 380,
            type: 'pie',
            },
            labels: ["Complete", "Incomplete", "Interceptions"],
            title: {
                text: 'Pass completions',
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
