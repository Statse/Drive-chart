import React from 'react'
import Typography from '@material-ui/core/Typography';
import StatCard from '../Wrappers/StatCard'

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
    

    return (
        <StatCard>
            <Typography variant="h5" component="h2">Total penalty yards</Typography>
            <Typography variant="h4" component="p">{defensePenaltyYards + offensePenaltyYards}</Typography>
            <Typography variant="h5" component="h2">Total penalties</Typography>
            <Typography variant="h4" component="p">{penalties.length}</Typography>
            <Typography variant="h5" component="h2">Offense penalties</Typography>
            <Typography variant="h4" component="p">{offensivePenalties}</Typography>
            <Typography variant="h5" component="h2">Defense penalties</Typography>
            <Typography variant="h4" component="p">{defensivePenalties}</Typography>
        </StatCard>
    )
}
