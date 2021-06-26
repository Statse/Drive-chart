import React from 'react'
import Typography from '@material-ui/core/Typography';
import StatCard from '../Wrappers/StatCard'

export default function CatchStats(props) {
    const {game, team, player} = props
    const {downs} = game


    let catchingYards = 0
    let incompletions = 0

    const catches = downs.filter((down)=>{
        const receiver = parseInt(down.carrier)

        console.log(receiver === parseInt(player))
      
        if (down.possession.toLowerCase() === team && receiver === parseInt(player) && down.playType === "Pass"   && down.result !== "Penalty") {
                catchingYards += down.endYardline - down.startYardline
                return down
        }
    }) 

    if (catches.length < 1){
        return null
    }
    
    const avarageCatchYardsPerCompletion =  Math.round((catchingYards / (catches.length - incompletions)) * 10) / 10

    return (
        <StatCard>
            <Typography variant="h5" component="h2">Catching yards</Typography>
            <Typography variant="h4" component="p">{catchingYards}</Typography>
            <Typography variant="h5" component="h2">Total catches</Typography>
            <Typography variant="h4" component="p">{catches.length}</Typography>
            <Typography variant="h5" component="h2">Catch yards per completion</Typography>
            <Typography variant="h4" component="p">{avarageCatchYardsPerCompletion}</Typography>
        </StatCard>
    )
}
