import React from 'react'
import StatCard from '../Wrappers/StatCard'
import ThrowMap  from '../../CustomCharts/ThrowMap'

export default function RunGaps(props) {
    const {game, team, player} = props
    const {downs} = game

    let totalYards = 0

    const zone = {

    }

    let zones = [
      [{},{},{}],
      [{},{},{}],
      [{},{},{}],
      [{},{},{}],
    ]

    const passes = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team){
            const qb = parseInt(down.carrier)
            if (down.playType === "Pass" && down.result !== "Penalty" && qb === parseInt(player)) {
              
            }
        }
    }) 
   
    // if (passes.length < 1){
    //   return null
    // }

    return (
        <StatCard>
            <ThrowMap zones={zones} totalPasses={passes.length} totalYards={totalYards}/>
        </StatCard>
    )
}
