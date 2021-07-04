import React from 'react'
import Typography from '@material-ui/core/Typography';
import StatCard from '../Wrappers/StatCard'

import SeriesMapper from  '../../../helpers/Series'

export default function FirstDowns(props) {
    const {game, team} = props
    const {downs} = game

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

    return (
        <StatCard>
                <Typography variant="h5" component="h2">First downs</Typography>
                <Typography variant="h4" component="p">{firstDowns}</Typography>
        </StatCard>
    )
}
