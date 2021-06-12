import React from 'react'
import Typography from '@material-ui/core/Typography';
import StatCard from '../Wrappers/StatCard'



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

    return (
        <StatCard>
            <Typography variant="h5" component="h2">Total running yards</Typography>
            <Typography variant="h4" component="p">{runningYards}</Typography>
            <Typography variant="h5" component="h2">Run attempts</Typography>
            <Typography variant="h4" component="p">{runningPlays.length}</Typography>
            <Typography variant="h5" component="h2">Run yards per attempt</Typography>
            <Typography variant="h4" component="p">{avarageRunYards}</Typography>
            <Typography variant="h5" component="h2">Running play turnovers</Typography>
            <Typography variant="h4" component="p">{turnovers}</Typography>
        </StatCard>
    )
}
