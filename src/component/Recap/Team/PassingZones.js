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
        if (down.playType === "Pass" && down.possession.toLowerCase() === team && down.result !== "Penalty"){
              const gain  = parseInt(down.endYardline) -  parseInt(down.startYardline)
              const throwLength = parseInt(down.catchYardLine) - parseInt(down.startYardline)
              const {passField} = down

              let zone = [0, 0]

              if (passField === "L"){
                zone[1] = 0
              } else if (passField === "M"){
                zone[1] = 1
              } else if (passField === "R"){
                zone[1] = 2
              }

              if (throwLength < 0) {
                  zone[0] = 0
              } else if (throwLength >= 0 && throwLength < 10){
                  zone[0] = 1
              } else if (throwLength >= 10 && throwLength < 20){
                  zone[0] = 2
              } else if (throwLength >= 20 && throwLength < 30){
                  zone[0] = 3
              }

              
              zones[zone[0]][zone[1]].yards += gain
              zones[zone[0]][zone[1]].attempts += 1

              if (down.result === "Interception"){
                zones[zone[0]][zone[1]].int += 1
              } else {
                totalYards += gain
              }

              if (down.result === "TD"){
                zones[zone[0]][zone[1]].td += 1
              }

              if (down.result !== "Incomplete" && down.result !== "Interception"){
                zones[zone[0]][zone[1]].comp += 1
              }

              return true
        }
    }) 

    if (passes.length < 1){
      return null
    }

    return (
        <StatCard>
            <ThrowMap zones={zones.reverse()} totalPasses={passes.length} totalYards={totalYards}/>
        </StatCard>
    )
}
