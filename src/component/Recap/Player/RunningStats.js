import React from 'react'
import Typography from '@material-ui/core/Typography';
import StatCard from '../Wrappers/StatCard'



export default function RunningStats(props) {
    const {game, team, player} = props
    const {downs} = game


    let runningYards = 0
    let turnovers = 0
    let fumbles = 0

    const runningPlays = downs.filter((down)=>{
    const rusher = parseInt(down.carrier)
    if (down.possession.toLowerCase() === team && rusher  === parseInt(player)){
        if (down.result !== "Penalty" && down.playType === "Run") {
                if (down.result === "Fumble" || down.result === "Fumble turnover"){
                    fumbles += 1
                }
                if (down.result !== "Turnover" && down.result !== "Fumble turnover"){
                    runningYards += down.endYardline - down.startYardline
                } else {
                    return turnovers += 1
                }
                return down
            }  
        }
    }) 
    
   
    if (runningPlays.length < 1){
        return null
    }

    const avarageRunYards =  Math.round((runningYards / runningPlays.length) * 10) / 10

    return (
        <StatCard>
            <Typography variant="h5" component="h2">Total running yards</Typography>
            <Typography variant="h4" component="p">{runningYards}</Typography>
            <Typography variant="h5" component="h2">Run attempts</Typography>
            <Typography variant="h4" component="p">{runningPlays.length}</Typography>
            <Typography variant="h5" component="h2">Run yards per attempt</Typography>
            <Typography variant="h4" component="p">{avarageRunYards}</Typography>
            <Typography variant="h5" component="h2">Fumbles</Typography>
            <Typography variant="h4" component="p">{fumbles}</Typography>
        </StatCard>
    )
}
