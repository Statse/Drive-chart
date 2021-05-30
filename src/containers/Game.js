import React, {useState, useEffect} from 'react'
import {useGame} from '../context/GameContext'

import GameForm from '../component/Game/GameForm'
import DownsList from '../component/Game/DownList'
import GameBottomNav from './GameBottomNav'

//ui
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "15px",
        marginTop: "75px",
        marginBottom: "75px"
    }
}));
  

export default function Game(props) {
    const classes = useStyles();
    const [error, setError] = useState("")
    const {getGame} = useGame()
    const [init, setInit] = useState(false)
    const {downs} = useGame()
    const [view, setView] = useState("game")

    console.log("<<<<<<<<<<<<<GAME RENDER>>>>>>>>>>>>>>>")
   

    //TODO: investigate what causes multiple render cycles and fix it
    useEffect(()=>{
        setError("") 
        if (!init){
            getGame(props.match.params.id).catch(e=>{
                setError(e)
                console.log(error)
            })
            setInit(true)
        }
    }, [error, props.match.params.id, getGame])
    


    //reference for values
    // https://www.hudl.com/support/classic/breakdown-stats-reports/hudl-assist/how-hudl-breaks-down-video
    return (
        <>
            <div className={classes.container}>
                {/* <div style={{marginBottom: "15px"}}>{home} {homeScore} vs {awayScore} {away}</div> */}
                {view === "game" ? (
                    <GameForm {...props}></GameForm>
                ) : (
                    <DownsList downs={downs}/>
                )}
            </div>
            <GameBottomNav 
                formId='game-form'
                gameId={props.match.params.id}
                setView={setView}
            />
        </>
    )
}
