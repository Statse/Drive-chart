import React, {useState, useEffect} from 'react'
import {useGame} from '../context/GameContext'
import Pie from '../component/Charts/Pie'

//ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


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

    let homeDowns,awayDowns;
    if (game.downs){
        homeDowns = game.downs.filter((down)=>{
            if (down.possession === "Home"){
                return down
            }
        }) 
    
        awayDowns = game.downs.filter((down)=>{
            if (down.possession === "Away"){
                return down
            }
        }) 
    }


    return (
    <div className={useStyles.wrapper}>
            <div style={{display:"flex",flexFlow:"row"}}>
                <div>{game.home} - {game.homeScore}</div>
                <div>{game.away} - {game.awayScore}</div>
            </div>
            {game.downs && (
                <div style={{width: '500px', height:'500px' }}>
                    <h3>Possession</h3>
                    <Pie data={
                        [{
                            "id": "home",
                            "label": game.home,
                            "value": homeDowns.length,
                            "color": "orange"
                        },
                        {
                            "id": "away",
                            "label": game.away,
                            "value": awayDowns.length,
                            "color": "black"
                        }]
                    }/> 
                </div>
            )}
        </div>
    )
}
