import React, {useRef,useState} from 'react'
import { Alert} from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from "react-router-dom"


import BottomNav from '../containers/BottomNavigation'
//material
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title:{
        marginBottom: 12
    },
    column: {
        display: "flex",
        flexFlow: "column"
    },
    pos: {
      marginBottom: 12,
    },
    form: {
        display: "flex",
        flexFlow: "column",
        marginBottom: 12,
    },
    input: {
        marginBottom: 12
    },
    fullWidth: {
        width: "100%",
    },
    minWidth: {
        minWidth:"275px",
    },
    center: {
        marginTop: "1rem",
        justifyContent: "center"
    },
    flexCenter: {
        display: "Flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%"
    }
  });

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {updateEmail, updatePassword, currentUser} = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const classes = useStyles(); 

    function handleSubmit(e){
        e.preventDefault()

        setLoading(true)
        setError("")

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match")
        }

        const promises = []
        if (emailRef){
            promises.push(updateEmail(emailRef.current.value))
        }

        if (passwordRef){
            promises.push(updatePassword(passwordRef.current.value))
        }


        Promise.all(promises).then((data)=>{
            setError("")
            history.push("/")
        }).catch((error)=>{
            console.log(error)
            return setError("Failed to update account")
        }).finally(()=>{
            setLoading(false)
            setError("")
        })
    }

    return (
    <Grid container spacing={3} className={classes.flexCenter}>
        <Grid item xs={12} md={6}>
            <Card>
                <CardContent>
                    <Typography className={classes.title} gutterBottom>Update profile</Typography> 
                        {error && <Alert variant="danger">{error}</Alert>}
                    <form onSubmit={handleSubmit} className={classes.form}>
                        
                    <TextField className={classes.input} id="standard-basic" defaultValue={currentUser.email} type="email" required inputRef={emailRef} label="Email" />
                    <TextField className={classes.input} id="standard-basic" type="password" required inputRef={passwordRef} label="Password" />
                    <TextField className={classes.input} id="standard-basic" type="password" required inputRef={passwordConfirmRef} label="Password confirmation" />
                    <Button disabled={loading} type="submit">Update profile</Button>
                </form>
                </CardContent>
                <CardActions className={classes.column}>
                    <Link to="/">Cancel</Link> 
                </CardActions>
            </Card>
            <BottomNav/>
        </Grid>
    </Grid>
    )
}
