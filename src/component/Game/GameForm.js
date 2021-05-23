import React, {useRef, useState, useEffect} from 'react'
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
      maxWidth: 300,
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
    const {_setDowns, downs} = useGame()
    const classes = useStyles();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    
    const [init, setInit] = useState(false)
    const [homeScore, setHomeScore] = useState(0)
    const [awayScore, setAwayScore] = useState(0)
    const [possession, setPossession] = useState("Home")
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
    const prevDown = downs[downs.length-1]

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        console.log("Loading...")
        try {
            const thisDown = {
                homeScore: homeScore,
                awayScore: awayScore,
                possession: possession,
                quarter: quarter,
                down: down,
                distance: distance,
                startYardline: startYardline,
                endYardline: endYardline,
                hash: hash,
                motion: motion,
                playDirection: playDirection,
                personel: personel,
                playType: playType,
                result: result,
            }

            console.log("prevDown", prevDown)
            console.log("thisDown", thisDown)

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
            console.log("Saved to db...")
            setInit(false)
            setLoading(false)
            console.log("Done!")
        } catch(error) {
            alert(error)
            console.log(error)
            setLoading(false)
            console.log("Done!")
            return setError("Submit failed")
        }
        setLoading(false)
    }


    const mapDownToCurrentState = (down) => {
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

    //game logic here
    const handlePossessionChange = (e) => {
        setPossession(e.target.value)
        if (playType ==="KO"){
            setStartYardline(35) 
        }
    }

    const handleQuarterChange = (e) => {
        setQuarter(e.target.value)
    }

    const handleDownChange = (e) => {
        setDown(e.target.value)
    }

    const handleStartYardlineChange = (e) => {
        setStartYardline(e.target.value)
    }

    const handleEndYardlineChange = (e) => {
        setEndYardline(e.target.value)
    }

    const handleYardlineBlur = (e) => {
        //limit values
    }

    const handlePlayTypeChange = (e) => {
        //Logic here
        setPlaytype(e.target.value)

        if (e.target.value==="KO"){
            setStartYardline(35) 
        }
    }

    const handleDistanceChange = (e) => {
        setDistance(e.target.value)
    }

    const handleHashChange = (e) => {
        setHash(e.target.value)
    }

    const handleMotionChange = (e) => {
        setMotion(e.target.value)
    }

    const handlePlaydirectionChange = (e) => {
        setPlaydirection(e.target.value)
    }

    const handleResultChange = (e) => {
        setResult(e.target.value)
    }

    const handlePersonelChange = (e) => {
        setPersonel(e.target.value)
    }


    const turnover = () => {
        if (downs[downs.length-1].possession ==="Home"){
            setPossession("Away")
        } else if (downs[downs.length-1].possession ==="Away"){
            setPossession("Home")
        }
        setStartYardline(100-downs[downs.length-1].endYardline)
    }

    const turnOverTD = () =>{
        if (downs[downs.length-1].possession ==="Home"){
            setPossession("Away")
            setAwayScore(awayScore+6)
        } else if (downs[downs.length-1].possession ==="Away"){
            setPossession("Home")
            setHomeScore(homeScore+6)
        }
        setPlaytype("PAT")
    }

    const TD = () => {
        if (downs[downs.length-1].possession ==="Home"){
            setHomeScore(homeScore+6)
        } else if (downs[downs.length-1].possession ==="Away"){
            setAwayScore(awayScore+6)
        }
        setPlaytype("PAT")
    }

    const PAT = (points) => {
        if (downs[downs.length-1].possession ==="Home"){
            setHomeScore(homeScore+points)
        } else if (downs[downs.length-1].possession ==="Away"){
            setAwayScore(awayScore+points)
        }
        setPlaytype("KO")
    }
  
    const changePossession = () => {
        if (downs[downs.length-1].possession === "Home"){
            setPossession("Away")
        } else if (downs[downs.length-1].possession ==="Away"){
            setPossession("Home")
        }
    }

    const firstDowns  = () =>  {
        setDistance(10)
        setDown(1)
    }

    const playResultHandler = (result) => {

        //Init form
        setHash("")
        setMotion("")
        setPlaydirection("")
        setPersonel("")
        setPlaytype("")
        setResult("")
        setStartYardline(downs[downs.length-1].endYardline)
        setEndYardline("")
        setDown(downs[downs.length-1].down+1)
        setDistance(downs[downs.length-1].distance - (downs[downs.length-1].endYardline-downs[downs.length-1].startYardline))

        switch(result) {
            case "xp good":
                PAT(1)
            break;
            case "2pt good":
                PAT(2)
            break;
            case "Good":
            break;
            case "No good":
                setPlaytype("KO")
            break;
            case "Touchback":
                setStartYardline(20) 
                firstDowns()
                if (downs[downs.length-1].possession ==="Home"){
                    setPossession("Away")
                } else if (downs[downs.length-1].possession ==="Away"){
                    setPossession("Home")
                }
            break;
            case "Complete":
                // code block
            break;
            case "Incomplete":
                // code block
            break;
            case "Interception":
                // code block
                if (downs[downs.length-1].endYardline === 0) {
                    turnOverTD()
                } else {
                    turnover()
                    firstDowns()
                }
            break;
            case "Rush":
                // code block
            break;
            case "TD":
                // code block
                TD()
            break;
            case "Sack":
                // code block
            break;
            case "Safety":
                // code block
            break;
            case "Turnover": 
                turnover()
                // code block
            break;
            case "Fumble recover":
                // code block
            break;
            case "Fumble turnover":
                if (downs[downs.length-1].endYardline === 0) {
                    turnOverTD()
                } else {
                    turnover()
                    firstDowns()
                }
            break;
            case "Penalty":
                // code block
            break;
            default:
              // code block
              console.log("default")
          }
    }

    //init based on previous downs
    if (!init && downs.length){ 

        setInit(true)

        playResultHandler(downs[downs.length-1].result)

        //new downs
        if ((endYardline-startYardline)>distance){
            setDistance(10)
            setDown(1)
        }
     

        // KICKING PLAYS
        if (downs[downs.length-1].playType ==="KO" || downs[downs.length-1].playType ==="punt"){
            if (downs[downs.length-1].possession ==="Home"){
                setPossession("Away") 
            } else if (downs[downs.length-1].possession ==="Away"){
                setPossession("Home") 
            }
        }
        
        //new downs
        if ((endYardline-startYardline)>distance && downs[downs.length-1].playType ==="Punt" ){
            setDistance(10)
            setDown(1)
        }

        if (downs[downs.length-1].playType ==="Punt"){
            setPossession(downs[downs.length-1].possession ==="Home" ? "Away" : "Home")
        }
    }

    return ( 
    <div className={useStyles.wrapper}>
        {downs.length  > 0 && (
           <DownNavigation downs={downs}/>
        )}
        <form id="game-form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={2}>
                        <InputLabel id="QTR-label">QTR</InputLabel>
                        <Select
                            labelId="QTR-label"
                            id="demo-simple-select"
                            className={classes.fullWidth + " " + classes.selectEmpty}
                            onChange={handleQuarterChange}
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
                <Grid item xs={12} md={2}>
                    <InputLabel id="possession-label">Possession</InputLabel>
                    <Select
                        labelId="possession-label"
                        id="demo-simple-select"
                        className={classes.fullWidth + " " + classes.selectEmpty}
                        onChange={handlePossessionChange}
                        value={possession}
                        label="Possession"
                        >
                        <MenuItem value={"Home"}>Home</MenuItem>
                        <MenuItem value={"Away"}>Away</MenuItem>
                    </Select>
                </Grid>
                {/*         
                   Always show from offensives perspective

                   own 0-50 
                   opp 50-0 
                   0 === safety/td
                */}
                <Grid item xs={12} md={2}>
                    <InputLabel className={classes.bottomMargin} id="playtype-label">Play type</InputLabel>
                    <Select
                        labelId="playtype-label"
                        id="demo-simple-select"
                        className={classes.fullWidth}
                        onChange={handlePlayTypeChange}
                        value={playType}
                        >
                        <MenuItem value={"KO"}>KO</MenuItem>
                        <MenuItem value={"Run"}>Run</MenuItem>
                        <MenuItem value={"Pass"}>Pass</MenuItem>
                        <MenuItem value={"Punt"}>Punt</MenuItem>
                        <MenuItem value={"FG"}>FG</MenuItem>
                        <MenuItem value={"PAT"}>PAT</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} md={2}>
                    <InputLabel className={classes.bottomMargin} id="yard-label">Start yard Line</InputLabel>
                    <TextField 
                    labelId="yard-label"
                    className={classes.fullWidth} 
                    id="standard-basic" 
                    type="number" 
                    value={startYardline}
                    onChange={handleStartYardlineChange}
                    onBlur={handleYardlineBlur}
                    required  />
                </Grid>
                <Grid item xs={12} md={2}>
                    <InputLabel className={classes.bottomMargin} id="yard-label">End yard Line</InputLabel>
                    <TextField 
                    labelId="yard-label"
                    className={classes.fullWidth} 
                    id="standard-basic" 
                    type="number" 
                    value={endYardline}
                    onChange={handleEndYardlineChange}
                    onBlur={handleYardlineBlur}
                    required  />
                </Grid>
                <Grid item xs={12} md={2}>
                    <InputLabel className={classes.bottomMargin} id="result-label">Play result</InputLabel>
                    <Select
                        labelId="result-label"
                        id="demo-simple-select"
                        className={classes.fullWidth}
                        onChange={handleResultChange}
                        value={result}
                        >
                        
                        {/* FG, XP */}
                        {(playType ==="PAT") && (<MenuItem value={"xp good"}>XP good</MenuItem>)}
                        {(playType ==="PAT") && (<MenuItem value={"2pt good"}>2pt good</MenuItem>)}

                        {(playType=="FG") && (<MenuItem value={"Good"}>Good</MenuItem>)}
                        {(playType=="FG" || playType ==="PAT") && (<MenuItem value={"No good"}>No Good</MenuItem>)}

                        
                        {(playType==="KO" || playType === "Punt") && (
                          <MenuItem value={"Touchback"}>Touchback</MenuItem>
                        )}

                        {/* pass */}
                        {playType=="Pass" && (<MenuItem value={"Complete"}>Complete</MenuItem>)}
                        {playType=="Pass" && (<MenuItem value={"Incomplete"}>Incomplete</MenuItem>)}
                        {playType=="Pass" && (<MenuItem value={"Interception"}>Interception</MenuItem>)}

                        {/* Other */}
                        <MenuItem value={"Rush"}>Rush</MenuItem>
                        <MenuItem value={"TD"}>Touchdown</MenuItem>
                        <MenuItem value={"Fumble recover"}>Fumble recover</MenuItem>
                        <MenuItem value={"Fumble turnover"}>Fumble turnover</MenuItem>
                        <MenuItem value={"Sack"}>Sack</MenuItem>
                        <MenuItem value={"Safety"}>Safety</MenuItem>
                        <MenuItem value={"Penalty"}>Penalty</MenuItem>
                        <MenuItem value={"Turnover"}>Turnover</MenuItem>
                    </Select>
                </Grid>
                {/*not in Kickoff, PAT */}
                {playType !=="PAT" && playType !=="KO" && (
                    <Grid item xs={12} md={2}>
                        <InputLabel className={classes.bottomMargin} id="down-label">Down</InputLabel>
                        <TextField  
                        labelId="down-label" 
                        className={classes.fullWidth} 
                        id="standard-basic"
                        type="number" 
                        onChange={handleDownChange}
                        value={down}
                        required />
                    </Grid>
                )}
                {/*not in Kickoff, PAT */}
                {playType !=="PAT" && playType !=="KO" && (
                    <Grid item xs={12} md={2}>
                        <InputLabel className={classes.bottomMargin} id="distance-label">Distance</InputLabel>
                        <TextField 
                        labelId="distance-label" 
                        className={classes.fullWidth}
                            id="standard-basic" 
                            type="number" 
                            required 
                            onChange={handleDistanceChange}
                            value={distance}
                            />
                    </Grid>
                )}
                <Grid item xs={12} md={2}>
                    <InputLabel className={classes.bottomMargin} id="hash-label">Hash</InputLabel>
                    <Select
                        labelId="hash-label"
                        id="demo-simple-select"
                        className={classes.fullWidth}
                        value={hash}
                        onChange={handleHashChange}
                        >
                        <MenuItem value={"L"}>L</MenuItem>
                        <MenuItem value={"M"}>M</MenuItem>
                        <MenuItem value={"R"}>R</MenuItem>
                    </Select>
                </Grid>
                {/*not in Kickoff, PAT */}
                {playType !=="PAT" && playType !=="KO" && playType !=="FG" && (
                    <Grid item xs={12} md={2}>
                        <InputLabel className={classes.bottomMargin} id="motion-label">Motion direction</InputLabel>
                        <Select
                            labelId="motion-label"
                            id="demo-simple-select"
                            className={classes.fullWidth}
                            onChange={handleMotionChange}
                            value={motion}
                            >
                            <MenuItem value={null}>No motion</MenuItem>
                            <MenuItem value={"L"}>L</MenuItem>
                            <MenuItem value={"R"}>R</MenuItem>
                        </Select>
                    </Grid>
                )}
                {result !=="Penalty" && (
                    <Grid item xs={12} md={2}>
                        <InputLabel className={classes.bottomMargin} id="playdirection-label">Play direction</InputLabel>
                        <Select
                            labelId="playdirection-label"
                            id="demo-simple-select"
                            className={classes.fullWidth}
                            onChange={handlePlaydirectionChange}
                            value={playDirection}
                            >
                            <MenuItem value={"L"}>L</MenuItem>
                            <MenuItem value={"R"}>R</MenuItem>
                        </Select>
                    </Grid>
                )}
                {playType !=="PAT" && playType !=="KO" && playType !=="FG" && (
                <Grid item xs={12} md={2}>
                    <InputLabel className={classes.bottomMargin} id="personel-label">Personel</InputLabel>
                    <TextField 
                    labelId="personel-label" 
                    className={classes.fullWidth} 
                    id="standard-basic" 
                    type="number" 
                    required 
                    value={personel}
                    onChange={handlePersonelChange}
                    />
                </Grid>
                )}
                {/* <Grid item xs={12}>
                    <Button className={classes.button} disabled={loading} variant="contained" type="submit">Save down</Button>
                    <Button onClick={handleTurnover} className={classes.button} disabled={loading} variant="contained" type="button">Turnover</Button>
                </Grid> */}
            </Grid>
        </form>
    </div>
    )
}
