import React, {useRef, useState, useEffect} from 'react'
import firebase from '../firebase'

// import DownList from '../component/DownList'
import DownsList from '../component/Game/DownList'
import GameBottomNav from './GameBottomNav'

//ui
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
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
    },
    container: {
        padding: "15px",
        marginTop: "75px",
        marginBottom: "75px"
    }
}));
  

export default function Game(props) {
    console.log(props)
    const classes = useStyles();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [home, setHome] = useState("")
    const [homeScore, setHomeScore] = useState("")
    const [away, setAway] = useState("")
    const [awayScore, setAwayScore] = useState("")
    const [ball, setBall] = useState("")
    const [downs, setDowns] = useState([])
    const [current, setCurrent] = useState({down: 1, distance: 10})
    
    const [view, setView] = useState("game")
    
    const [possession, setPossession] = useState(0)
    const [quarter, setQuarter] = useState(1)
    const [down, setDown] = useState(1)
    const [distance, setDistance] = useState()
    const [gain, setGain] = useState()
    const [yardline, setYardline] = useState()
    const [hash, setHash] = useState()
    const [motion, setMotion] = useState()
    const [playDirection, setPlaydirection] = useState()
    const [personel, setPersonel] = useState()
    const [coverage, setCoverage] = useState()
    const [playType, setPlaytype] = useState()
    const [result, setResult] = useState()

    console.log("downs ", downs)

    useEffect(async ()=>{
        setError("")
        setLoading(true)

        const getGame = async () => {
            try {
                const res = await firebase.firestore().collection('games').doc(props.match.params.id).get();
                const data =  res.data()
                console.log("this is loaded ", data)
                setHome(data.home)
                setHomeScore(data.homeScore)
                setAway(data.away)
                setAwayScore(data.awayScore)
                setDowns(data.downs)
                setLoading(false)
            } catch {
                setLoading(false)
                console.log(error)
                setError(error)
            }
        }
        getGame()
    }, [error])

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        try {
            console.log(downs)
            const down = [
                possession || null,
                quarter || null,
                down || null,
                distance || null,
                yardline || null,
                gain || null,
                hash || null,
                motion || null,
                playDirection || null,
                personel || null,
                playType || null,
                result || null,
            ]
            console.log("Possession, quater, down, distance, yard line, gain, hash, motion direction, play direction, personel, play type, result")
            console.log(down)
            // const down = {
            //     possession: possessionRef.current.value,
            //     down: downRef.current.value,
            //     gain: gainRef.current.value,
            //     yardLine: yardLineRef.current.value,
            //     distance: distanceRef.current.value,
            //     hash: hashRef.current.value,
            //     motionDirection: motionRef.current.value,
            //     playDirection: playDirectionRef.current.value,
            //     personel: personelRef.current.value,
            //     result: resultRef.current.value,
            //     qtr: qtrRef.current.value,
            //     playType: playType.current.value
            // }
            setDowns(downs.push(down))
            console.log(downs)
            
            await firebase.firestore()
                .collection('games')
                .doc(props.match.params.id)
                .set(
                    { 
                        downs: downs
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

    const handleTurnover = () => {

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
        setPlaytype(e.target.value)
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

    //reference for values
    // https://www.hudl.com/support/classic/breakdown-stats-reports/hudl-assist/how-hudl-breaks-down-video
    return (
        <>
            <div class={classes.container}>
                <div style={{marginBottom: "15px"}}>{home} {homeScore} vs {awayScore} {away}</div>
                {view === "game" ? (
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
                                // inputRef={possessionRef}
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
                                    // inputRef={qtrRef}
                                    >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>OT</MenuItem>
                                </Select>
                        </Grid>
                        {/*not in Kickoff, PAT, 2PT */}
                        {playType !== 0 && playType !== 5 && playType !== 6 && (
                            <Grid item xs={12} md={2}>
                                <InputLabel className={classes.bottomMargin} id="down-label">Down</InputLabel>
                                <TextField  
                                labelId="down-label" 
                                className={classes.fullWidth} 
                                id="standard-basic"
                                type="number" 
                                onChange={handleDownChange}
                                // inputRef={downRef}
                                value={down}
                                required />
                            </Grid>
                        )}
                        {/*         
                            0 home team end zone
                            100 away team endzone 
                            25 home team 25y line
                            75 away team 25y line 
                        */}
                        <Grid item xs={12} md={2}>
                            <InputLabel className={classes.bottomMargin} id="yard-label">Yard Line</InputLabel>
                            <TextField 
                            labelId="yard-label"
                            className={classes.fullWidth} 
                            id="standard-basic" 
                            type="number" 
                            value={yardline}
                            onChange={handleYardlineChange}
                            // inputRef={yardLineRef}
                            required  />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <InputLabel className={classes.bottomMargin} id="playtype-label">Play type</InputLabel>
                            <Select
                                labelId="playtype-label"
                                id="demo-simple-select"
                                className={classes.fullWidth}
                                onChange={handlePlayTypeChange}
                                value={playType}
                                // inputRef={playType}
                                >
                                <MenuItem value={0}>KO</MenuItem>
                                <MenuItem value={1}>Run</MenuItem>
                                <MenuItem value={2}>Pass</MenuItem>
                                <MenuItem value={3}>Punt</MenuItem>
                                <MenuItem value={4}>FG</MenuItem>
                                <MenuItem value={5}>PAT</MenuItem>
                                <MenuItem value={6}>2 pt conversion</MenuItem>
                            </Select>
                        </Grid>
                        {/*not in Kickoff, PAT, 2PT */}
                        {playType !== 0 && playType !== 5 && playType !== 6 && (
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
                                //  inputRef={distanceRef} 
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
                            // inputRef={gainRef} 
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
                                // inputRef={hashRef}
                                >
                                <MenuItem value={0}>L</MenuItem>
                                <MenuItem value={1}>M</MenuItem>
                                <MenuItem value={2}>R</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <InputLabel className={classes.bottomMargin} id="motion-label">Motion direction</InputLabel>
                            <Select
                                labelId="motion-label"
                                id="demo-simple-select"
                                className={classes.fullWidth}
                                onChange={handleMotionChange}
                                value={motion}
                                // inputRef={motionRef}
                                >
                                <MenuItem value={null}>No motion</MenuItem>
                                <MenuItem value={0}>L</MenuItem>
                                <MenuItem value={1}>R</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <InputLabel className={classes.bottomMargin} id="playdirection-label">Play direction</InputLabel>
                            <Select
                                labelId="playdirection-label"
                                id="demo-simple-select"
                                className={classes.fullWidth}
                                onChange={handlePlaydirectionChange}
                                value={playDirection}
                                // inputRef={playDirectionRef}
                                >
                                <MenuItem value={0}>L</MenuItem>
                                <MenuItem value={1}>R</MenuItem>
                            </Select>
                        </Grid>
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
                            // inputRef={personelRef} 
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <InputLabel className={classes.bottomMargin} id="result-label">Play result</InputLabel>
                            <Select
                                labelId="result-label"
                                id="demo-simple-select"
                                className={classes.fullWidth}
                                onChange={handleResultChange}
                                value={result}
                                // inputRef={resultRef}
                                >
                                    
                                <MenuItem value={0}>Turnover</MenuItem>
                                <MenuItem value={1}>Run</MenuItem>
                                <MenuItem value={2}>Complete</MenuItem>
                                <MenuItem value={3}>Incomplete</MenuItem>
                                <MenuItem value={4}>Touchdown</MenuItem>
                                <MenuItem value={5}>Fumble</MenuItem>
                                <MenuItem value={6}>Fumble TD</MenuItem>
                                <MenuItem value={7}>Interception</MenuItem>
                                <MenuItem value={8}>Interception TD</MenuItem>
                                <MenuItem value={9}>Sack</MenuItem>
                                <MenuItem value={10}>Safety</MenuItem>

                                <MenuItem value={11}>FG good</MenuItem>
                                <MenuItem value={12}>FG miss</MenuItem>

                                <MenuItem value={13}>PAT good</MenuItem>
                                <MenuItem value={14}>PAT no good</MenuItem>
                                <MenuItem value={15}>2 pt conversion good</MenuItem>

                                <MenuItem value={16}>Penalty</MenuItem>
                            </Select>
                        </Grid>
                        {/* <Grid item xs={12}>
                            <Button className={classes.button} disabled={loading} variant="contained" type="submit">Save down</Button>
                            <Button onClick={handleTurnover} className={classes.button} disabled={loading} variant="contained" type="button">Turnover</Button>
                        </Grid> */}
                    </Grid>
                </form>
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
