import React, {useRef, useState, useEffect} from 'react'
import firebase from '../firebase'

import DownList from './DownList'

//ui
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
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
    
    const possessionRef = useRef()
    const downRef = useRef()
    const distanceRef = useRef()
    const personelRef = useRef()
    const coverageRef = useRef()
    const playTypeRef = useRef()

    useEffect(async ()=>{
        setError("")
        setLoading(true)
        try {
            const res = await firebase.firestore().collection('games').doc(props.match.params.id).get();
            const data =  res.data()
            console.log("this is loaded ",data)
            setHome(data.home)
            setHomeScore(data.homeScore)
            setHome(data.home)
            setAwayScore(data.awayScore)
            setDowns(data.downs)
            setLoading(false)
        } catch {
            setLoading(false)
            console.log(error)
            setError(error)
        }
    }, [error])

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        console.log(possessionRef.current.value)
        console.log(downRef.current.value)
        console.log(distanceRef.current.value)
        console.log(personelRef.current.value)
        console.log(coverageRef.current.value)
        try {
            await firebase.firestore().collection('games').doc(props.match.params.id).update()
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
        <div>
            {home} {homeScore} vs {awayScore} {away}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                            {/* <InputLabel id="demo-simple-select-label">Poksession</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className={classes.fullWidth + " " + classes.selectEmpty}
                                onChange={handleChange}
                                inputRef={possessionRef}
                                >
                                <MenuItem value={"home"}>Home</MenuItem>
                                <MenuItem value={"away"}>Away</MenuItem>
                            </Select>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField className={classes.fullWidth} id="standard-basic" type="numer" required inputRef={downRef} label="Down" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField className={classes.fullWidth} id="standard-basic" type="number" required inputRef={distanceRef} label="Distance" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField className={classes.fullWidth} id="standard-basic" type="number" required inputRef={personelRef} label="Personel" />
                    </Grid>
                    
                    <Grid item xs={3}>
                        <InputLabel id="demo-simple-select-label">Play type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className={classes.fullWidth}
                            onChange={handleChange}
                            inputRef={playTypeRef}
                            >
                            <MenuItem value={"pass"}>Pass</MenuItem>
                            <MenuItem value={"run"}>Run</MenuItem>
                            <MenuItem value={"pat"}>PAT</MenuItem>
                            <MenuItem value={"fg"}>FG</MenuItem>
                            <MenuItem value={"ko"}>KO</MenuItem>
                            <MenuItem value={"punt"}>Punt</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={3}>
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
                    </Grid>
                    <Grid item xs={12}>
                        <Button className={classes.button} disabled={loading} variant="contained" type="submit">Save down</Button>
                        <Button onClick={handleTurnover} className={classes.button} disabled={loading} variant="contained" type="button">Turnover</Button>
                    </Grid>
                </Grid>
            </form>
            {downs && (
                <DownList downs={downs}></DownList>
            )}
        </div>
    )
}
