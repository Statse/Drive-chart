import React from 'react'
import StatCard from '../Wrappers/StatCard'
import Typography from '@material-ui/core/Typography';

export default function PassAvarageGain(props) {
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
    
    const avarageYards =  Math.round((totalYards / plays.length) * 10) / 10

    return (
        <StatCard>
            <Typography variant="h5" component="h2">Total yards</Typography>
            <Typography variant="h4" component="p">{totalYards}</Typography>
            <Typography variant="h5" component="h2">Total plays</Typography>
            <Typography variant="h4" component="p">{plays.length}</Typography>
            <Typography variant="h5" component="h2">Yards per play</Typography>
            <Typography variant="h4" component="p">{avarageYards}</Typography>
            <Typography variant="h5" component="h2">Turnovers</Typography>
            <Typography variant="h4" component="p">{turnovers}</Typography>
        </StatCard>
    )
}
