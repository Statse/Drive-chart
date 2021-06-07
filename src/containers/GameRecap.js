import React, {useState, useEffect} from 'react'
import {useGame} from '../context/GameContext'

//ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Game from '../component/Recap/Game'


const useStyles = makeStyles((theme) => ({
    container: {
        padding: "15px",
        marginTop: "75px",
        marginBottom: "75px",
        maxWidth: '1300px',
    }
}));
  
export default function GameRecap(props) {
    const {getGame, game} = useGame()

    const [error, setError] = useState("")
    const [init, setInit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [view, setView] =  useState("Game") //Game, Home, Away

    //TODO: investigate what causes multiple render cycles and fix it
    useEffect(()=>{
        setError("") 
        //This is because I don't know any onther way to make async work inside useEffect
        async function loadGame(id) {
            await getGame(id).catch(e=>{
                setError(e)
                console.log(error)
            })
        }
        if (!init){
            setLoading(true)
            loadGame(props.match.params.id).then(()=>{setLoading(false)}).catch((e)=>{
                setError(e)
                return alert(e)
            })
            setInit(true)
        }
    }, [error, props.match.params.id, getGame])
    

    if (!init && !loading){
        return null
    }

    console.log(game)

    return (
    <div className={useStyles.wrapper}>
        <Grid item xs={12} md={2}>
                    <InputLabel id="view-label">view</InputLabel>
                    <Select
                        labelId="view-label"
                        id="view"
                        // className={classes.fullWidth + " " + classes.selectEmpty}
                        onChange={(e) =>  setView(e.target.value)}
                        label="QTR"
                        value={view}
                        >
                        <MenuItem value={"Game"}>Game</MenuItem>
                        <MenuItem value={"Home"}>Home</MenuItem>
                        <MenuItem value={"Away"}>Away</MenuItem>
                    </Select>
                    {view === "Game" && (
                        <Game game={game}/>
                    )}
                     {view === "Home" && (
                       <div>Kotijoukkueen tilastot</div>
                    )}
                     {view === "Away" && (
                       <div>Vierasjoukkueen tilastot</div>
                    )}
        </Grid>
       
    </div>
        
    )
}
