import React, {useState} from 'react'
import firebase from '../../firebase'

import {useGame} from '../../context/GameContext'
//ui
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';

import DownNavigation from './downNavigation'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        position: "relative",
    },
    formControl: {
      margin: theme.spacing(1),
    //   maxWidth: 300,
      width: 'auto'
    },
    button: {
        margin: theme.spacing(1),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    fullWidth: {
        width: '100%'
    },
    bottomMargin: {
        marginBottom: '1.5rem'
    }
}));
  

export default function GameForm(props) {
    const {_setDowns, _updateDown, downs} = useGame()
    const classes = useStyles();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    
    const [init, setInit] = useState(false)
    const [homeScore, setHomeScore] = useState(0)
    const [awayScore, setAwayScore] = useState(0)
    const [possession, setPossession] = useState("")
    const [quarter, setQuarter] = useState(1)
    const [down, setDown] = useState(1)
    const [distance, setDistance] = useState(10)
    const [startYardline, setStartYardline] = useState(0)
    const [endYardline, setEndYardline] = useState(0)
    const [hash, setHash] = useState("")
    const [motion, setMotion] = useState("")
    const [playDirection, setPlaydirection] = useState("")
    const [personel, setPersonel] = useState(20)
    const [playType, setPlaytype] = useState("")
    const [result, setResult] = useState("")
    const [downIndex, setDownIndex] = useState(downs.length)
    const [editMode,  setEditMode]  = useState(false)
    const [Qb, setQb] = useState(0)
    const [carrier, setCarrier] = useState(0)
    const [tackler, setTackler] = useState(0)
    // const [tackleAssist, setTackleAssist] = useState(0)

    console.log("editMode", editMode)

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        try {
            const thisDown = {
                homeScore: parseInt(homeScore),
                awayScore: parseInt(awayScore),
                possession: possession,
                quarter: parseInt(quarter),
                down: parseInt(down),
                distance: parseInt(distance),
                startYardline: parseInt(startYardline),
                endYardline: parseInt(endYardline),
                hash: hash,
                motion: motion,
                playDirection: playDirection,
                personel: parseInt(personel),
                playType: playType,
                result: result,
                qb: Qb,
                tackler: tackler,
                carrier: carrier,
                // tackleAssist: tackleAssist,

            }

            
            if (editMode){
                console.log("updating...")
                const _downs = _updateDown(thisDown, downIndex)
                await firebase.firestore()
                .collection('games')
                .doc(props.match.params.id)
                .set(
                    { 
                        downs: _downs
                    },
                    { merge: true }
                )
                console.log("Updated to db.")
                //go to next down after save

                setDownIndex(downIndex+1)

                //downIndex hasnt updated yet se we need to +1 it...
                if (downIndex + 1 === downs.length){
                    resetDown()
                    setInit(false)
                    setEditMode(false)
                }
            } else {
                const _downs = _setDowns(thisDown)       
                await firebase.firestore()
                .collection('games')
                .doc(props.match.params.id)
                .set(
                    { 
                        downs: _downs
                    },
                    { merge: true }
                )
                console.log("Saved to db.")
            }
            
  
            setInit(false)
            setLoading(false)
        } catch(e) {
            setError(e)
            console.log(error)
            setLoading(false)
            return alert(error)
        }
        setLoading(false)
    }


    const resetDown = () => {
        setPossession("")
        setQuarter("")
        setDown("")
        setDistance("")
        setStartYardline("")
        setEndYardline("")
        setHash("")
        setMotion("")
        setPlaydirection("")
        setPersonel("")
        setResult("")
    }


    const mapDownToCurrentState = (down) => {
        if (!down){
            return false
        }

        if (down.result !== "Game end"){
            setPossession(down.possession)
            setQuarter(down.quarter)
            setDown(down.down)
            setDistance(down.distance)
            setStartYardline(down.startYardline)
            setEndYardline(down.endYardline)
            setHash(down.hash)
            setMotion(down.motion)
            setPlaydirection(down.playDirection)
            setPersonel(down.personel)
            setResult(down.result)
        }
        setPlaytype(down.playType)
    }

    //game logic here
    const turnover = (thisDown) => {
        changePossession(thisDown.possession)
        setStartYardline(100-thisDown.endYardline)
        setQb(0)
    }
  
    const changePossession = (possession) => {
        if (possession === "Home"){
            setPossession("Away")
        } else if (possession ==="Away"){
            setPossession("Home")
        }
    }

    const firstDowns  = () =>  {
        setDistance(10)
        setDown(1)
    }


    const playResultHandler = (downData) => {
        //Init form
        setHash(downData.playDirection)
        setPossession(downData.possession)
        setHomeScore(downData.homeScore)
        setAwayScore(downData.awayScore)
        setQuarter(downData.quarter)
        setMotion("")
        setPlaydirection("")
        setPersonel("")
        setPlaytype("")
        setResult("")
        setStartYardline(downData.endYardline)
        setEndYardline("")
        setDown(parseInt(downData.down)+1)
        setDistance(downData.distance - (downData.endYardline-downData.startYardline))
        setQb(downData.Qb)

        if (downData.playType ==="PAT"){
            setStartYardline(35) 
        }

        if ((downData.playType ==="KO" || downData.playType ==="Punt") && downData.result !== "Turnover" && downData.result !== "Fumble turnover"){
            setStartYardline(100-downData.endYardline)
            changePossession(downData.possession)
        }

        //figure out stuff based on previous down result
        switch(downData.result) {
            case "xp good":
                setPlaytype("KO")
            break;
            case "2pt good":
                setPlaytype("KO")
            break;
            case "Good":
                setPlaytype("KO")
            break;
            case "No good":
                setPlaytype("KO")
            break;
            case "Touchback":
                changePossession(downData.possession)
                setStartYardline(20) 
                firstDowns()
            break;
            case "Complete":
                // code block
            break;
            case "Incomplete":
                // code block
                setHash(downData.hash)
            break;
            case "Interception":
                // code block
                changePossession(downData.possession)
                setStartYardline(100-downData.endYardline)
                firstDowns()
            break;
            case "Rush":
                // code block
            break;
            case "TD":
                // code block
                setPlaytype("PAT")
                setStartYardline(97)
            break;
            case "Sack":
                // code block
            break;
            case "Safety":
                // code block
            break;
            case "Turnover": 
                if (downData.playType === "KO" || downData.playType ==="punt"){
                    firstDowns()
                } else {
                    changePossession(downData.possession)
                    setStartYardline(100-downData.endYardline)
                    firstDowns()
                }
            break;
            case "Fumble recover":
                // code block
            break;
            case "Fumble turnover":          
                if (downData.playType === "KO" || downData.playType ==="Punt"){
                    //We set possession after kick just before this function so we have to change possession again...
                    //TODO: make better logic :)
                    changePossession(possession)
                    firstDowns()
                } else {
                    changePossession(downData.possession)
                    setStartYardline(100-downData.endYardline)
                    firstDowns()
                }
            break;
            case "Penalty":
                // code block
                if (downData.playType === "PAT"){
                    setPlaytype("PAT")
                    setStartYardline(downData.endYardline)
                }
            break;
            default:
            break;
        }

    }

    //init based on previous downs
    if (!init && downs.length){ 

        if (downIndex < downs.length && editMode){
            console.log(">>>>>>>>>>>>>>EDIT")
            mapDownToCurrentState(downs[downIndex])
            setInit(true)
        } else if (!editMode && downs.length>0){
            console.log(">>>>>>>>>>>>>>INIT")
            //Initialize form first time
            setDownIndex(downs.length)
            // KICKING PLAYS
            if (downs[downs.length-1].playType ==="KO" || downs[downs.length-1].playType ==="Punt"){
                if (downs[downs.length-1].possession ==="Home"){
                    setPossession("Away") 
                } else if (downs[downs.length-1].possession ==="Away"){
                    setPossession("Home") 
                }
                if (downs[downs.length-1].result)
                firstDowns()
            }

            playResultHandler(downs[downs.length-1])

            if ((downs[downs.length-1].endYardline-downs[downs.length-1].startYardline)>=downs[downs.length-1].distance ){
                firstDowns()
                console.log("startYardline + distance", startYardline + distance)
                //endyardline or distance might be string sometimes so lets make sure its integer
                if (parseInt(downs[downs.length-1].endYardline) + parseInt(distance) > 100){
                //if close to goal line
                    setDistance(100-downs[downs.length-1].endYardline)
                }
            } else if (downs > 4) {
                turnover(downs[downs.length-1]) 
                firstDowns()
            }
            setInit(true)
        } else if (!editMode) {
            //if there is no downs the first down is kickoff
            setPlaytype("KO")
            setStartYardline(35)
            setInit(true)
        }
    } 

    // console.log("============<GAMEFORM RENDER==============")
    // console.log("init", init)
    // console.log("edit", editMode)
    // console.log("downs.length", downs.length)
    // console.log("downIndex", downIndex)

    return ( 
    <div className={useStyles.wrapper}>
        <DownNavigation resetDown={()=>resetDown} downs={downs} prevDown={downIndex-1} down={downs[downIndex-1]} setEditMode={(bool)=>{setEditMode(bool)}} setInit={(bool)=>{setInit(bool)}}  maxDowns={downs.length} downIndex={downIndex} setDownIndex={(index)=>{setDownIndex(index)}}/>
        <form id="game-form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
             {!loading && ( 
                <Grid item xs={12} md={2}>
                        <InputLabel id="QTR-label">QTR</InputLabel>
                        <Select
                            labelId="QTR-label"
                            id="demo-simple-select"
                            className={classes.fullWidth + " " + classes.selectEmpty}
                            onChange={(e) =>  setQuarter(e.target.value)}
                            label="QTR"
                            value={quarter}
                            >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>OT</MenuItem>
                        </Select>
                </Grid>
                )}
                {playType !== "Game end" && (
                <Grid item xs={12} md={2}>
                    <InputLabel id="possession-label">Possession</InputLabel>
                    <Select
                        labelId="possession-label"
                        id="demo-simple-select"
                        className={classes.fullWidth + " " + classes.selectEmpty}
                        onChange={(e) => {
                            setPossession(e.target.value)
                            if (playType ==="KO"){
                                setStartYardline(35) 
                            }
                        }}
                        value={possession}
                        label="Possession"
                        >
                        <MenuItem value={"Home"}>Home</MenuItem>
                        <MenuItem value={"Away"}>Away</MenuItem>
                    </Select>
                </Grid>
                )}
                {playType !== "Game end" && (
                <Grid item xs={12} md={2}>
                    <InputLabel className={classes.bottomMargin} id="yard-label">Start yard Line</InputLabel>
                    <TextField 
                    labelId="yard-label"
                    className={classes.fullWidth} 
                    id="standard-basic" 
                    type="number" 
                    value={startYardline}
                    onChange={(e) => setStartYardline(e.target.value)}
                    onBlur={(e) => {
                        //limit values
                        if (e.target.value >= 100){
                            setStartYardline(99)
                        } else if (e.target.value < 0){
                            setStartYardline(0)
                        }
                    }}
                    required  />
                </Grid>
                )}
                {playType !== "Game end" && (
                <Grid item xs={12} md={2}>
                    <InputLabel className={classes.bottomMargin} id="hash-label">Hash</InputLabel>
                    <Select
                        labelId="hash-label"
                        id="demo-simple-select"
                        className={classes.fullWidth}
                        value={hash}
                        onChange={(e)=>setHash(e.target.value)}
                        required
                        >
                        <MenuItem value={"L"}>L</MenuItem>
                        <MenuItem value={"M"}>M</MenuItem>
                        <MenuItem value={"R"}>R</MenuItem>
                    </Select>
                </Grid>
                )}
                {playType !== "Game end" && playType !=="KO" && playType !=="FG" && (
                <Grid item xs={12} md={2}>
                    <InputLabel className={classes.bottomMargin} id="personel-label">Personel</InputLabel>
                    <TextField 
                    labelId="personel-label" 
                    className={classes.fullWidth} 
                    id="standard-basic" 
                    type="number" 
                    value={personel}
                    onChange={(e)=>setPersonel(e.target.value)}
                    />
                </Grid>
                )}
                
                {/*         
                   Always show from offensives perspective

                   own 0-50 
                   opp 50-0 
                   0 === safety/td
                */}
                <Grid item xs={12} md={playType !== "Game end" ? 2 : 12}>
                    <InputLabel className={classes.bottomMargin} id="playtype-label">Play type</InputLabel>
                    <Select
                        labelId="playtype-label"
                        id="demo-simple-select"
                        className={classes.fullWidth}
                        onChange={(e) => {
                            setPlaytype(e.target.value)
                            if (e.target.value==="KO"){
                                setStartYardline(35) 
                            }
                        }}
                        value={playType}
                        >
                        <MenuItem value={"KO"}>KO</MenuItem>
                        <MenuItem value={"Run"}>Run</MenuItem>
                        <MenuItem value={"Pass"}>Pass</MenuItem>
                        <MenuItem value={"Punt"}>Punt</MenuItem>
                        <MenuItem value={"FG"}>FG</MenuItem>
                        <MenuItem value={"PAT"}>PAT</MenuItem>
                        <MenuItem value={"Game end"}>Game end</MenuItem>
                    </Select>
                </Grid>
                {/*not in Kickoff, PAT */}
                {playType !=="KO" && playType !=="FG" && playType !== "Game end" && (
                    <Grid item xs={12} md={2}>
                        <InputLabel className={classes.bottomMargin} id="motion-label">Motion direction</InputLabel>
                        <Select
                            labelId="motion-label"
                            id="demo-simple-select"
                            className={classes.fullWidth}
                            onChange={(e)=>setMotion(e.target.value)}
                            value={motion}
                            >
                            <MenuItem value={null}>No motion</MenuItem>
                            <MenuItem value={"L"}>L</MenuItem>
                            <MenuItem value={"R"}>R</MenuItem>
                        </Select>
                    </Grid>
                )}
                {result !=="Penalty" && playType !== "Game end" && (
                    <Grid item xs={12} md={2}>
                        <InputLabel className={classes.bottomMargin} id="playdirection-label">Play direction</InputLabel>
                        <Select
                            labelId="playdirection-label"
                            id="demo-simple-select"
                            className={classes.fullWidth}
                            onChange={(e)=>setPlaydirection(e.target.value)}
                            value={playDirection}
                            >
                            <MenuItem value={"L"}>L</MenuItem>
                            <MenuItem value={"R"}>R</MenuItem>
                        </Select>
                    </Grid>
                )}
                {playType !== "Game end" && (
                <Grid item xs={12} md={2}>
                    <InputLabel className={classes.bottomMargin} id="result-label">Play result</InputLabel>
                    <Select
                        labelId="result-label"
                        id="demo-simple-select"
                        className={classes.fullWidth}
                        onChange={(e)=>{
                            setResult(e.target.value)
                            if (e.target.value === "Incomplete"){
                                setEndYardline(startYardline)
                            }
                            if (e.target.value === "TD"){
                                setEndYardline(100)
                            }
                            if (e.target.value === "No good"){
                                setEndYardline(startYardline)
                            }
                        }}
                        value={result}
                        required
                        >
                        
                        {/* FG, XP */}
                        {(playType ==="PAT") && (<MenuItem value={"xp good"}>XP good</MenuItem>)}
                        {(playType ==="PAT") && (<MenuItem value={"2pt good"}>2pt good</MenuItem>)}

                        {(playType==="FG") && (<MenuItem value={"Good"}>Good</MenuItem>)}
                        {(playType==="FG" || playType ==="PAT") && (<MenuItem value={"No good"}>No Good</MenuItem>)}

                        
                        {(playType  ==="KO" || playType === "Punt") && (
                          <MenuItem value={"Touchback"}>Touchback</MenuItem>
                        )}

                        {/* pass */}
                        {playType==="Pass" && (<MenuItem value={"Complete"}>Complete</MenuItem>)}
                        {playType==="Pass" && (<MenuItem value={"Incomplete"}>Incomplete</MenuItem>)}
                        {playType==="Pass" && (<MenuItem value={"Interception"}>Interception</MenuItem>)}

                        {/* Other */}
                        <MenuItem value={"Rush"}>Rush</MenuItem>
                        <MenuItem value={"Catch"}>Catch</MenuItem>
                        <MenuItem value={"Oob"}>Out of bounds</MenuItem>
                        <MenuItem value={"Ib"}>In-bounds</MenuItem>
                        <MenuItem value={"TD"}>Touchdown</MenuItem>
                        <MenuItem value={"Fumble recover"}>Fumble recover</MenuItem>
                        <MenuItem value={"Fumble turnover"}>Fumble turnover</MenuItem>
                        <MenuItem value={"Sack"}>Sack</MenuItem>
                        <MenuItem value={"Safety"}>Safety</MenuItem>
                        <MenuItem value={"Penalty"}>Penalty</MenuItem>
                        <MenuItem value={"Turnover"}>Turnover</MenuItem>
                    </Select>
                </Grid>
                )}
                {/* Receiver can be from defence if it is interception. */}
                {playType === "Pass" && (
                    <Grid item xs={12} md={2}>
                        <InputLabel className={classes.bottomMargin} id="qb-label">QB</InputLabel>
                        <TextField 
                        labelId="qb-label"
                        className={classes.fullWidth} 
                        id="standard-basic" 
                        type="number" 
                        value={endYardline}
                        onChange={(e)=>setQb(e.target.value)}
                        onBlur={(e) => {
                            if (e.target.value > 99){
                                setQb(99)
                            } 
                        }}
                        required  />
                    </Grid>
                )}
                {playType === "Run" || playType === "Pass" && (
                    <Grid item xs={12} md={2}>
                        <InputLabel className={classes.bottomMargin} id="carrier-label">{playType === "Run" ? "Rusher" : "Receiver"}</InputLabel>
                        <TextField 
                        labelId="carrier-label"
                        className={classes.fullWidth} 
                        id="standard-basic" 
                        type="number" 
                        value={endYardline}
                        onChange={(e)=>setCarrier(e.target.value)}
                        onBlur={(e) => {
                            if (e.target.value > 99){
                                setCarrier(99)
                            } 
                        }}
                        required  />
                    </Grid>
                )}
                
                {playType !== "Game end" && (
                <Grid item xs={12} md={2}>
                    <InputLabel className={classes.bottomMargin} id="yard-label">End yard Line</InputLabel>
                    <TextField 
                    labelId="yard-label"
                    className={classes.fullWidth} 
                    id="standard-basic" 
                    type="number" 
                    value={endYardline}
                    onChange={(e)=>setEndYardline(e.target.value)}
                    onBlur={(e) => {
                        if (e.target.value > 100){
                            setEndYardline(100)
                        } else if (e.target.value < 0){
                            setEndYardline(0)
                        }
                    }}
                    required  />
                </Grid>
                )}
                {/*not in Kickoff, PAT */}
                {playType !== "Game end" && playType !=="PAT" && playType !=="KO" && (
                    <Grid item xs={12} md={2}>
                        <InputLabel className={classes.bottomMargin} id="down-label">Down</InputLabel>
                        <TextField  
                        labelId="down-label" 
                        className={classes.fullWidth} 
                        id="standard-basic"
                        type="number" 
                        onChange={(e)=>setDown(e.target.value)}
                        value={down}
                        required />
                    </Grid>
                )}
                {/*not in Kickoff, PAT */}
                {playType !== "Game end" && playType !=="PAT" && playType !=="KO" && (
                    <Grid item xs={12} md={2}>
                        <InputLabel className={classes.bottomMargin} id="distance-label">Distance</InputLabel>
                        <TextField 
                        labelId="distance-label" 
                        className={classes.fullWidth}
                        id="standard-basic" 
                        type="number" 
                        required 
                        onChange={(e)=>setDistance(e.target.value)}
                        value={distance}
                        />
                    </Grid>
                )}
               {playType !== "Game end" && (
                 <Grid item xs={12} md={2}>
                    <InputLabel className={classes.bottomMargin} id="down-label">Home score</InputLabel>
                    <TextField  
                    labelId="down-label" 
                    className={classes.fullWidth} 
                    id="standard-basic"
                    type="number" 
                    onChange={(e)=>setHomeScore(e.target.value)}
                    value={homeScore}
                    required />
                </Grid>
               )}
               {playType !== "Game end" && (
                <Grid item xs={12} md={2}>
                    <InputLabel className={classes.bottomMargin} id="down-label">Away score</InputLabel>
                    <TextField  
                    labelId="down-label" 
                    className={classes.fullWidth} 
                    id="standard-basic"
                    type="number" 
                    onChange={(e)=>setAwayScore(e.target.value)}
                    value={awayScore}
                    required />
                </Grid>
               )}
            </Grid>
        </form>
    </div>
    )
}
