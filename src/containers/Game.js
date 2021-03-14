import React, {useState, useEffect} from 'react'
// import firebase from '../firebase'
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
    const [loading, setLoading] = useState(false)
    const {getGame} = useGame()
    const {downs} = useGame()
    console.log("downs", downs)
    // const {getGame} = useGame()
    // const [home, setHome] = useState("")
    // const [homeScore, setHomeScore] = useState("")
    // const [away, setAway] = useState("")
    // const [awayScore, setAwayScore] = useState("")
    
    const [view, setView] = useState("game")
    
    // const [possession, setPossession] = useState(0)
    // const [quarter, setQuarter] = useState(1)
    // const [down, setDown] = useState(1)
    // const [distance, setDistance] = useState()
    // const [gain, setGain] = useState()
    // const [yardline, setYardline] = useState()
    // const [hash, setHash] = useState()
    // const [motion, setMotion] = useState()
    // const [playDirection, setPlaydirection] = useState()
    // const [personel, setPersonel] = useState()
    // const [coverage, setCoverage] = useState()
    // const [playType, setPlaytype] = useState()
    // const [result, setResult] = useState()

    
    useEffect(async ()=>{
        setError("")
        getGame(props.match.params.id).catch(e=>{
            setError(e)
        })
    }, [error])

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
