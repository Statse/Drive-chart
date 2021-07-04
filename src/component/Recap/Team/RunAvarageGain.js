import React from 'react'
import  StatTable from '../Wrappers/StatTable'



export default function PassAvarageGain(props) {
    const {game, team} = props
    const {downs} = game


    let runningYards = 0
    let turnovers = 0

    const runningPlays = downs.filter((down)=>{

    if (down.possession.toLowerCase() === team){
        if (down.result !== "Penalty" && down.playType === "Run") {
                if (down.result !== "Turnover" && down.result !== "Fumble turnover"){
                    runningYards += down.endYardline - down.startYardline
                } else {
                    return turnovers += 1
                }
                return down
            }  
        }
    }) 
    
    const avarageRunYards =  Math.round((runningYards / runningPlays.length) * 10) / 10


    const data = [
        {
            name: "Total yards",
            data: runningYards,
        },
        {
            name: "Total plays",
            data: runningPlays.length
        },
        {
            name: "Avg gain / run play",
            data: avarageRunYards,
        },
    ]

    
    if (turnovers > 0){
        data.push({name: "Running turnovers", data: turnovers})
    }

    return(<StatTable heading={"Run statistics"} description={team} data={data} />)
}
