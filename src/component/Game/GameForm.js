import React, {useRef, useState, useEffect} from 'react'
import firebase from '../../firebase'

import {useGame} from '../../context/GameContext'
//ui
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';

// import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
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
    
    const [series, setSeries] = useState(1)
    const [possession, setPossession] = useState(0)
    const [quarter, setQuarter] = useState(1)
    const [down, setDown] = useState(1)
    const [distance, setDistance] = useState("")
    const [gain, setGain] = useState("")
    const [yardline, setYardline] = useState("")
    const [hash, setHash] = useState("")
    const [motion, setMotion] = useState("")
    const [playDirection, setPlaydirection] = useState("")
    const [personel, setPersonel] = useState("")
    const [coverage, setCoverage] = useState("")
    const [playType, setPlaytype] = useState("")
    const [result, setResult] = useState("")

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        try {
            const prevDown = downs[downs.length-1]

            const thisDown = {
                possession: possession,
                quarter: quarter,
                down: down,
                distance: distance,
                yardline: yardline,
                gain: gain,
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
            console.log("_downs", _downs)
            
            await firebase.firestore()
                .collection('games')
                .doc(props.match.params.id)
                .set(
                    { 
                        downs: _downs
                    },
                    { merge: true }
                )
            setLoading(false)
        } catch(error) {
            console.log(error)
            setLoading(false)
            return setError("Submit failed")
        }
        setLoading(false)
    }

    //game logic here
    const handlePossessionChange = (e) => {
        setPossession(e.target.value)
    }

    const handleQuarterChange = (e) => {
        setQuarter(e.target.value)
    }

    const handleDownChange = (e) => {
        setDown(e.target.value)
    }

    const handleYardlineChange = (e) => {
        setYardline(e.target.value)
    }

    const handlePlayTypeChange = (e) => {
        //Logic here
        setPlaytype(e.target.value)

        if (e.target.value==="KO"){
            const field = possession === 0 ? -1 : 1; // 0 home 1 away
            setYardline(20*field) 
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

    const handleGainChange = (e) => {
        setGain(e.target.value)
    }

    return ( 
        <form id="game-form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
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
                        <MenuItem value={0}>Home</MenuItem>
                        <MenuItem value={1}>Away</MenuItem>
                    </Select>
                </Grid>
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
                {/*         
                    -50 home team end zone
                    -25 home team 25y line
                    25 away team 25y line 
                    50 away team endzone 
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
                        <MenuItem value={"2pt"}>2 pt conversion</MenuItem>
                    </Select>
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

                        {playType=="FG" || playType == "PAT" && (<MenuItem value={11}>Good</MenuItem>)}
                        {playType=="FG" || playType == "PAT" && (<MenuItem value={12}>No Good</MenuItem>)}

                        {/* pass */}
                        {playType=="Pass" && (<MenuItem value={"Complete"}>Complete</MenuItem>)}
                        {playType=="Pass" && (<MenuItem value={"Incomplete"}>Incomplete</MenuItem>)}
                        {playType=="Pass" && (<MenuItem value={"Int"}>Interception</MenuItem>)}
                        {playType=="Pass" && (<MenuItem value={"Int td"}>Interception TD</MenuItem>)}

                        {/* Other */}
                        <MenuItem value={"Run"}>Run</MenuItem>
                        <MenuItem value={"TD"}>Touchdown</MenuItem>
                        <MenuItem value={"Fumble"}>Fumble</MenuItem>
                        <MenuItem value={"Fumble TD"}>Fumble TD</MenuItem>
                        <MenuItem value={"Sack"}>Sack</MenuItem>
                        <MenuItem value={"Safety"}>Safety</MenuItem>
                        <MenuItem value={"Penalty"}>Penalty</MenuItem>
                        <MenuItem value={"Turnover"}>Turnover</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} md={2}>
                    <InputLabel className={classes.bottomMargin} id="yard-label">Yard Line</InputLabel>
                    <TextField 
                    labelId="yard-label"
                    className={classes.fullWidth} 
                    id="standard-basic" 
                    type="number" 
                    value={yardline}
                    onChange={handleYardlineChange}
                    required  />
                     {/* <Slider
                        defaultValue={0}
                        step={1}
                        marks
                        min={-50}
                        max={50}
                        valueLabelDisplay="auto"
                    /> */}
                </Grid>
                {/*not in Kickoff, PAT, 2PT */}
                {playType !== "PAT" && playType !== "2pt" && playType !== "KO" && (
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
                {/*not in Kickoff, PAT, 2PT */}
                {playType !== "PAT" && playType !== "2pt" && playType !== "KO" && (
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
                    <InputLabel className={classes.bottomMargin} id="gain-label">Gain</InputLabel>
                    <TextField 
                    labelId="gain-label" 
                    className={classes.fullWidth} 
                    id="standard-basic" 
                    type="number" 
                    required 
                    value={gain}
                    onChange={handleGainChange}
                    />
                </Grid>
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
                {/*not in Kickoff, PAT, 2PT */}
                {playType !== "PAT" && playType !== "KO" && playType !== "FG" && (
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
                            <MenuItem value={"Left"}>L</MenuItem>
                            <MenuItem value={"Right"}>R</MenuItem>
                        </Select>
                    </Grid>
                )}
                {result !== "Penalty" && (
                    <Grid item xs={12} md={2}>
                        <InputLabel className={classes.bottomMargin} id="playdirection-label">Play direction</InputLabel>
                        <Select
                            labelId="playdirection-label"
                            id="demo-simple-select"
                            className={classes.fullWidth}
                            onChange={handlePlaydirectionChange}
                            value={playDirection}
                            >
                            <MenuItem value={0}>L</MenuItem>
                            <MenuItem value={1}>R</MenuItem>
                        </Select>
                    </Grid>
                )}
                {playType !== "PAT" && playType !== "KO" && playType !== "FG" && (
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
    )
}
