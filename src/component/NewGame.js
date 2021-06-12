import React, { useState, useRef} from 'react'
import { useHistory } from "react-router-dom"


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


import firebase from '../firebase'

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    fullWidth: {
        width: "100%",
    },
    center: {
        marginTop: "1rem",
        justifyContent: "center"
    }
  });

export default function NewGame() {
    
    const classes = useStyles();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const homeRef = useRef()
    const awayRef = useRef()
    const divisionRef = useRef()
    const yearRef = useRef()
    const userId = firebase.auth().currentUser.uid;

    //uus juttu
    async function newGame() {
        setLoading(true)
        setError("")

        if (!awayRef.current.value || !homeRef.current.value){
            return setError("Set teams!")
        }

        const data = {
            home: homeRef.current.value,
            away: awayRef.current.value,
            division: divisionRef,
            year: yearRef,
            downs: [],
            owner: userId,
        }
        try {
            const res = await firebase.firestore().collection('games').add(data);
            history.push(`/game/${res.id}`)
        } catch(e) {
            setError(e)
            console.log(error)
            setLoading(false)
            return alert(error)
        }
    }


    return (
        <Card className={classes.root}>
            <CardContent>
                <TextField className={classes.fullWidth} id="standard-basic" type="text" required inputRef={homeRef} label="Home" />
                <TextField className={classes.fullWidth} id="standard-basic" type="text" required inputRef={awayRef} label="Away" />   
                <InputLabel className={classes.bottomMargin} id="gender-label">Play direction</InputLabel>
                <Select
                    labelId="gender-label"
                    className={classes.fullWidth}
                    inputRef={divisionRef} 
                    >
                    <MenuItem value={"MLIIGA"}>Vaahteraliiga</MenuItem>
                    <MenuItem value={"M1D"}>Miesten 1. divisioona</MenuItem>
                    <MenuItem value={"M2D"}>Miesten 2. divisioona</MenuItem>
                    <MenuItem value={"M3D"}>Miesten 3. divisioona</MenuItem>
                    <MenuItem value={"NLIIGA"}>Naisten Vaahteraliiga</MenuItem>
                    <MenuItem value={"N1D"}>Naisten 1. divisioona</MenuItem>
                    <MenuItem value={"N2D"}>Naisten 2. divisioona</MenuItem>
                </Select>
                <Select
                    labelId="gender-label"
                    className={classes.fullWidth}
                    inputRef={yearRef} 
                    >
                    <MenuItem value={2021}>2021</MenuItem>
                    <MenuItem value={2020}>2020</MenuItem>
                    <MenuItem value={2019}>2019</MenuItem>
                </Select>

                <CardActions className={classes.center}>
                    <Button disabled={loading} onClick={newGame} variant="contained" color="secondary">
                        New game
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}
