import React from 'react'
import StatCard from '../Wrappers/StatCard'
import CatchMap  from '../../CustomCharts/CatchMap'

export default function RunGaps(props) {
    const {game, team, player} = props
    const {downs} = game

    let totalYards = 0

    const zone = {
        yards: 0,
        td: 0,
        catch: 0,
        attempts: 0,
    }

    const zones = [
      [Object.assign({},zone),Object.assign({},zone),Object.assign({},zone)],
      [Object.assign({},zone),Object.assign({},zone),Object.assign({},zone)],
      [Object.assign({},zone),Object.assign({},zone),Object.assign({},zone)],
      [Object.assign({},zone),Object.assign({},zone),Object.assign({},zone)],
    ]

    const catches = downs.filter((down)=>{
      const receiver = parseInt(down.carrier)
        if (down.playType === "Pass" && down.possession.toLowerCase() === team && down.result !== "Penalty" && receiver === parseInt(player)){
              const gain  = parseInt(down.endYardline) -  parseInt(down.startYardline)
              const catchLength = parseInt(down.catchYardLine) - parseInt(down.startYardline)
              const {passField} = down

              let zone = [0, 0]

              if (passField === "L"){
                zone[1] = 0
              } else if (passField === "M"){
                zone[1] = 1
              } else if (passField === "R"){
                zone[1] = 2
              }

              if (catchLength < 0) {
                  zone[0] = 3
              } else if (catchLength >= 0 && catchLength < 10){
                  zone[0] = 2
              } else if (catchLength >= 10 && catchLength < 20){
                  zone[0] = 1
              } else if (catchLength >= 20 && catchLength < 30){
                  zone[0] = 0
              }
              
              totalYards += gain
              
              console.log(zone)
              zones[zone[0]][zone[1]].yards += gain
              zones[zone[0]][zone[1]].catchLength += catchLength
              zones[zone[0]][zone[1]].catch += 1

              if (down.result === "TD"){
                zones[zone[0]][zone[1]].td += 1
              }

              return true
        }
    }) 
   
    if (catches.length < 1){
      return null
    }

    return (
        <StatCard>
            <CatchMap zones={zones} totalCatches={catches.length} totalYards={totalYards}/>
        </StatCard>
    )
}
