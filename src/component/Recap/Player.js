import React from 'react'
import Grid from '@material-ui/core/Grid';

//Charts
import RunGaps from './Player/RunGaps';
import PassingZones from './Player/PassingZones';
import RunningStats from './Player/RunningStats';
import CatchStats from './Player/CatchStats';
import CatchZones from './Player/CatchZones';
import DefenceStats from './Player/DefenceStats';



export default function Player(props) {
    const {game, team, player} = props
    

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <h1>Player #{player}</h1>
            </Grid>
            {game.downs && (
                <>
                    <RunGaps game={game} team={team} player={player}/>
                    <PassingZones game={game} team={team} player={player}/>
                    <RunningStats game={game} team={team} player={player}/>
                    <CatchStats game={game} team={team} player={player}/>
                    <CatchZones game={game} team={team} player={player}/>
                    <DefenceStats game={game} team={team} player={player}/>
                </>
            )}
        </Grid>
    )
}
