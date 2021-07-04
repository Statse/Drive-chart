import React from 'react'
import  StatTable from '../Wrappers/StatTable'

export default function PassAvarageGain(props) {
    const {game, team} = props
    const {downs} = game


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
    
    const avaragePassYards =  Math.round((passingYards / passes.length) * 10) / 10
    const avaragePassYardsPerCompletion =  Math.round((passingYards / (passes.length - incompletions)) * 10) / 10

    const data = [
        {
            name: "Total passing yards",
            data: passingYards,
        },
        {
            name: "Total passing plays",
            data: passes.length
        },
        {
            name: "Avg gain / pass play",
            data: avaragePassYards,
        },
        {
            name: "Pass yards per completion",
            data: avaragePassYardsPerCompletion,
        },
        {
            name: "Interceptions",
            data: interceptions,
        }
    ]

    return (
        <StatTable heading={"Passing statistics"} description={team} data={data} />
    )
}
