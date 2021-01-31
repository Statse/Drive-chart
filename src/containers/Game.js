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
    
    const possessionRef = useRef()
    const qtrRef = useRef()
    const downRef = useRef()
    const distanceRef = useRef()
    const personelRef = useRef()
    const coverageRef = useRef()
    const playTypeRef = useRef()
    const resultRef = useRef()

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
            console.log("TRYING?")
            console.log(downs)
            const down = {
                possession: possessionRef.current.value,
                down: downRef.current.value,
                distance: distanceRef.current.value,
                personel: personelRef.current.value,
                result: resultRef.current.value,
                qtr: qtrRef.current.value,
                playType: playTypeRef.current.value
            }
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

    const handleChange = (event) => {
        setBall(event.target.value);
    };

    const handleTurnover = () => {

    }

    return (
        <>
            <div class={classes.container}>
                <div style={{marginBottom: "15px"}}>{home} {homeScore} vs {awayScore} {away}</div>
                {view === "game" ? (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3} lg={2}>
                            <InputLabel id="possession-label">Possession</InputLabel>
                            <Select
                                labelId="possession-label"
                                id="demo-simple-select"
                                className={classes.fullWidth + " " + classes.selectEmpty}
                                onChange={handleChange}
                                inputRef={possessionRef}
                                label="Possession"
                                >
                                <MenuItem value={"home"}>Home</MenuItem>
                                <MenuItem value={"away"}>Away</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={3} lg={2}>
                                <InputLabel id="QTR-label">QTR</InputLabel>
                                <Select
                                    labelId="QTR-label"
                                    id="demo-simple-select"
                                    className={classes.fullWidth + " " + classes.selectEmpty}
                                    onChange={handleChange}
                                    label="QTR"
                                    inputRef={qtrRef}
                                    >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>OT</MenuItem>
                                </Select>
                        </Grid>
                        <Grid item xs={12} md={3} lg={2}>
                            <InputLabel id="down-label">Down</InputLabel>
                            <TextField  labelId="down-label" className={classes.fullWidth} id="standard-basic" type="number" required inputRef={downRef}/>
                        </Grid>
                        <Grid item xs={12} md={3} lg={2}>
                            <InputLabel id="distance-label">Distance</InputLabel>
                            <TextField labelId="distance-label" className={classes.fullWidth} id="standard-basic" type="number" required inputRef={distanceRef} />
                        </Grid>
                        <Grid item xs={12} md={3} lg={2}>
                            <InputLabel id="personel-label">Personel</InputLabel>
                            <TextField labelId="personel-label" className={classes.fullWidth} id="standard-basic" type="number" required inputRef={personelRef} />
                        </Grid>
                        
                        <Grid item xs={12} md={3} lg={2}>
                            <InputLabel id="playtype-label">Play type</InputLabel>
                            <Select
                                labelId="playtype-label"
                                id="demo-simple-select"
                                className={classes.fullWidth}
                                onChange={handleChange}
                                inputRef={playTypeRef}
                                >
                                <MenuItem value={"pass"}>Pass</MenuItem>
                                <MenuItem value={"run"}>Run</MenuItem>
                                <MenuItem value={"pat"}>PAT</MenuItem>
                                <MenuItem value={"2-pt-conversion"}>2 pt conversion</MenuItem>
                                <MenuItem value={"fg"}>FG</MenuItem>
                                <MenuItem value={"ko"}>KO</MenuItem>
                                <MenuItem value={"punt"}>Punt</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={3} lg={2}>
                            <InputLabel id="result-label">Play result</InputLabel>
                            <Select
                                labelId="result-label"
                                id="demo-simple-select"
                                className={classes.fullWidth}
                                onChange={handleChange}
                                inputRef={resultRef}
                                >
                                <MenuItem value={"pass"}>Touchdown</MenuItem>
                                <MenuItem value={"run"}>PAT good</MenuItem>
                                <MenuItem value={"pat"}>PAT no good</MenuItem>
                                <MenuItem value={"2-pt-conversion"}>2 pt conversion good</MenuItem>
                                <MenuItem value={"fg"}>Catch</MenuItem>
                                <MenuItem value={"ko"}>Incomplete</MenuItem>
                                <MenuItem value={"punt"}>Fumble</MenuItem>
                                <MenuItem value={"penalty"}>Penalty</MenuItem>
                            </Select>
                        </Grid>
                        {/* <Grid item xs={12} md={3} lg={2}>
                            <InputLabel id="demo-simple-select-label">Coverage</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className={classes.fullWidth}
                                onChange={handleChange}
                                inputRef={coverageRef}
                                >
                                <MenuItem value={"man"}>Man</MenuItem>
                                <MenuItem value={"zone"}>Zone</MenuItem>
                                <MenuItem value={"blitz"}>Blitz</MenuItem>
                            </Select>
                        </Grid> */}
                        <Grid item xs={12}>
                            <Button className={classes.button} disabled={loading} variant="contained" type="submit">Save down</Button>
                            <Button onClick={handleTurnover} className={classes.button} disabled={loading} variant="contained" type="button">Turnover</Button>
                        </Grid>
                    </Grid>
                </form>
                ) : (
                    <DownsList downs={downs}/>
                )}
            </div>
            <GameBottomNav 
                gameId={props.match.params.id}
                setView={setView}
            />
        </>
    )
}
