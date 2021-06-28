import React from 'react'
import Typography from '@material-ui/core/Typography';
import StatCard from '../Wrappers/StatCard'



export default function DefenceStats(props) {
    const {game, team, player} = props
    const {downs} = game


    let tackles = 0
    let tfl = 0
    let interceptions = 0
    let sacks = 0
    let returnYards = 0

    const plays = downs.filter((down)=>{
    if (down.possession.toLowerCase() !== team && down.result !== "Penalty"  && down.result !== "Incomplete"){
                const gain = down.endYardline - down.startYardline

                if (parseInt(player) === parseInt(down.carrier) && down.result === "Interception"){
                    returnYards += down.catchYardLine - down.endYardline
                    interceptions += 1
                    return down
                }

                if (parseInt(player) === parseInt(down.tackleAssist)){
                    tackles += 0.5

                    if (gain < 0){
                        tfl += 0.5
                    }

                    return down
                }

                if (parseInt(player) === parseInt(down.tackler)){
                    if (parseInt(down.tackleAssist) > 0){
                        tackles += 0.5
                        if (gain < 0){
                            tfl += 0.5
                        }
                    } else {
                        tackles += 1
                        if (gain < 0){
                            tfl += 1
                        }
                    }
                    return down
                }

        }
    }) 

   
    if (plays.length < 1){
        return null
    }

    return (
        <StatCard>
            {tackles > 0 && (
            <>
                <Typography variant="h5" component="h2">Tackles</Typography>
                <Typography variant="h4" component="p">{tackles}</Typography>
            </>
            )}
            {tfl > 0 && (
            <>
                <Typography variant="h5" component="h2">Tackles for loss</Typography>
                <Typography variant="h4" component="p">{tfl}</Typography>
            </>
            )}
            {sacks > 0 && (
            <>
                <Typography variant="h5" component="h2">Sacks</Typography>
                <Typography variant="h4" component="p">{sacks}</Typography>
            </>
            )}
            {interceptions > 0 && (
            <>
                <Typography variant="h5" component="h2">Interceptions</Typography>
                <Typography variant="h4" component="p">{interceptions}</Typography>
                <Typography variant="h5" component="h2">Interception return yards</Typography>
                <Typography variant="h4" component="p">{returnYards}</Typography>
            </>
            )}
        </StatCard>
    )
}
