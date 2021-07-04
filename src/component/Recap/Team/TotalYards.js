import React from 'react'
import  StatTable from '../Wrappers/StatTable'
import SeriesMapper from  '../../../helpers/Series'

export default function OffenseStats(props) {
    const {game, team} = props
    const {downs} = game

    let totalYards = 0
    let turnovers = 0

    const plays = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team ){
            if (down.result !== "Penalty" && (down.playType === "Run" || down.playType === "Pass")){
                if (down.result !== "Turnover" && down.result !== "Fumble turnover" && down.result !== "Interception"){
                    totalYards += down.endYardline - down.startYardline
                } else {
                    turnovers += 1
                }
                return down
            } 
        }
    }) 
    
    const playSeries = SeriesMapper(downs)

    let firstDowns = 0

    playSeries.map((series)=>{
      let possession = ""
      let firsts = series.filter((down)=>{
        possession = down.possession
        if (down.down === 1 && down.playType !== "KO" && down.playType !== "PAT"){
          return down
        }
      })

      if (firsts.length > 0){
        if (possession.toLowerCase() === team.toLowerCase()){
          firstDowns += firsts.length - 1
        } 
      }
    })
    
    
    const avarageYards =  Math.round((totalYards / plays.length) * 10) / 10



    const data = [
        {
            name: "Total yards",
            data: totalYards,
        },
        {
            name: "First downs",
            data: firstDowns,
        },
        {
            name: "Total plays",
            data: plays.length
        },
        {
            name: "Avg gain / play",
            data: avarageYards,
        }
    ]


    if (turnovers > 0){
        data.push({name: "Total turnovers", data: turnovers})
    }

    return (
        <StatTable heading={"Offense statistics"} description={team} data={data} />
    )
}
