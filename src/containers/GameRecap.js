import React, {useState, useEffect} from 'react'
import {useGame} from '../context/GameContext'

//ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//custom components
import Score from '../component/Recap/Score'
import Stats from '../component/Recap/Stats/Stats'
import Game from '../component/Recap/Game'
import Team from '../component/Recap/Team'
import Pass from '../component/Recap/Stats/Pass'
import Run from '../component/Recap/Stats/Run'





const useStyles = makeStyles((theme) => ({
    container: {
        padding: "25px",
        width: "100%",
        minHeight: "100vh"
    },
    mb: {
        marginBottom: "2rem",
    },
    btn: {
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
    }
}));
  
export default function GameRecap(props) {
    const {getGame, game} = useGame()

    const [error, setError] = useState("")
    const [init, setInit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [type, setType] =  useState("game")//game, run, pass
    const [team, setTeam] =  useState("both")//both, home, away
    const typeOptions = [
        "pass",
        "run",
        "game"
    ]

    const classes = useStyles()

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
        <div style={{padding: "15px"}}>
                  <Card>
                    <CardContent>
                        <Score game={game}/>
                    </CardContent>
                    <CardContent>
                        {/* <div style={{display: "flex", flexFlow: "row", justifyContent: "center", marginBottom: "1rem"}}>
                            <Button className={classes.btn} variant="contained" onClick={()=>setType("game")} color={type ==="game" ? "primary" : ""}>Game</Button>
                            <Button className={classes.btn} variant="contained" onClick={()=>setType("pass")} color={type ==="pass" ? "primary" : ""}>Pass</Button>
                            <Button className={classes.btn} variant="contained" onClick={()=>setType("run")} color={type ==="run" ? "primary" : ""}>Run</Button>
                        </div> */}
                        <div style={{display: "flex", flexFlow: "row", justifyContent: "center", marginBottom: "1rem"}}>
                            <Button className={classes.btn} variant="contained" onClick={()=>setTeam("both")} color={team ==="both" ? "primary" : ""}>Compare</Button>
                            <Button className={classes.btn} variant="contained" onClick={()=>setTeam("home")} color={team ==="home" ? "primary" : ""}>Home</Button>
                            <Button className={classes.btn} variant="contained" onClick={()=>setTeam("away")} color={team ==="away" ? "primary" : ""}>Away</Button>
                        </div>
                    </CardContent>
                    {team === "both"  && (<Game game={game} team={team}/>)}

                    {/* {type === "pass"  && (<Pass game={game} team={team}/>)}
                    {type === "run"  &&  (<Run game={game} team={team}/>)} */}

                    {team !== "both" && (
                        <Team game={game} team={team} />
                    )}
                </Card>
        
    
    </div>
        
    )
}
