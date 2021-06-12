import React from 'react'
import Typography from '@material-ui/core/Typography';
import StatCard from '../Wrappers/StatCard'

export default function FirstDowns(props) {
    const {game, team} = props
    const {downs} = game

    const firstDowns = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team){
            if (down.playType !== "KO"){
                if (down.down === 1){
                    return down.down
                }
            }
        }
    })
    

    return (
        <StatCard>
                <Typography variant="h5" component="h2">First downs</Typography>
                <Typography variant="h4" component="p">{firstDowns.length}</Typography>
        </StatCard>
    )
}
