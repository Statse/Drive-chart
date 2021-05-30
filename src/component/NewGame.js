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
    const userId = firebase.auth().currentUser.uid;

    //uus juttu
    async function newGame() {
        setLoading(true)
        setError("")
        console.log(awayRef.current.value)
        console.log(homeRef.current.value)

        if (!awayRef.current.value || !homeRef.current.value){
            return setError("Set teams!")
        }

        const data = {
            home: homeRef.current.value,
            homeScore: 0,
            away: awayRef.current.value,
            awayScore: 0,
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
                <div>
                    <TextField className={classes.fullWidth} id="standard-basic" type="text" required inputRef={homeRef} label="Home" />
                </div>
                <div>
                    <TextField className={classes.fullWidth} id="standard-basic" type="text" required inputRef={awayRef} label="Away" />   
                </div> 
                <CardActions className={classes.center}>
                    <Button disabled={loading} onClick={newGame} variant="contained" color="secondary">
                        New game
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}
