import React from 'react'
import StatCard from '../Wrappers/StatCard'
import ThrowMap  from '../../CustomCharts/ThrowMap'

export default function RunGaps(props) {
    const {game, team, player} = props
    const {downs} = game

    const LEFT = 0
    const MIDDLE  = 1 
    const RIGHT = 2 

    let totalYards = 0

    const zone = {
        yards: 0,
        attempts: 0,
        int: 0,
        td: 0,
        comp: 0,
    }

    const zones = [
      [Object.assign({},zone),Object.assign({},zone),Object.assign({},zone)],
      [Object.assign({},zone),Object.assign({},zone),Object.assign({},zone)],
      [Object.assign({},zone),Object.assign({},zone),Object.assign({},zone)],
      [Object.assign({},zone),Object.assign({},zone),Object.assign({},zone)],
    ]

    const passes = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team){
            const qb = parseInt(down.carrier)
            console.log(down)
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
