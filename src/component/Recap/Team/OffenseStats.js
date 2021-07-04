import React from 'react'
import StatCard from '../Wrappers/StatCard'
import  StatTable from '../../Util/StatTable'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    table: {
      minWidth: 0,
    },
  });

export default function OffenseStats(props) {
    const {game, team} = props
    const {downs} = game

    const classes = useStyles();

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



    const data = [
        {
            name: "Total yards",
            data: 1,
        }
    ]

    return (
        <StatCard>
            <StatTable heading={"Offense statistics"} description={team} data={data} />
        </StatCard>
    )
}
