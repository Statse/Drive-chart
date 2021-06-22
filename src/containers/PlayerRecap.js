import React, {useState, useEffect} from 'react'

//ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//custom components
import Score from '../component/Recap/Score'
import Game from '../component/Recap/Game'
import Team from '../component/Recap/Team'
import DriveChart from '../component/Recap/DriveChart'



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
    const {getGame, game} = props.useGame()

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
            setLoading(true)
            await getGame(id).catch(e=>{
                setError(e)
                console.log(error)
            })
            setLoading(false)
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
    
    if (loading){
        return (
        <div style={{padding: "15px", display: "flex", flexFlow: "row", justifyContent: "center"}}>
            <CircularProgress />
        </div>
        )
    }

    if (!init && !loading){
        return null
    }

    return (
    <div style={{padding: "15px"}}>
        
    </div>
        
    )
}
