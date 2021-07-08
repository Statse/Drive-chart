import React from 'react'
import StatTable from '../Wrappers/StatTable'

export default function Penalties(props) {
    const {game, team} = props
    const {downs} = game


    let offensivePenalties = 0
    let offensePenaltyYards = 0
    let defensivePenalties = 0
    let defensePenaltyYards = 0

    const penalties = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team){
            if (down.result === "Penalty" && (down.endYardline - down.startYardline < 0) ) {
                offensePenaltyYards += (down.endYardline - down.startYardline) * -1
                return offensivePenalties += 1
            }
        } else {
            if (down.result === "Penalty" && (down.endYardline - down.startYardline > 0)) { 
                defensePenaltyYards += (down.endYardline - down.startYardline)
                return defensivePenalties += 1
            }
        }
    })
    

    const data = [
        {
            name: "Penalty yards",
            data: defensePenaltyYards + offensePenaltyYards,
        },
        {
            name: "Total penalties",
            data: penalties.length
        },
        {
            name: "Offense penalties",
            data: offensivePenalties,
        },
        {
            name: "Defense penalties",
            data: defensivePenalties,
        },
    ]


    return(<StatTable heading={"Penalty statistics"} description={team} data={data} />)
}
