import React, {useRef,useState} from 'react'
import { Alert} from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from "react-router-dom"

//material
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';;


const useStyles = makeStyles({
    root: {
      minWidth: 275,
      maxWidth: 500,
    },
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

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const classes = useStyles(); 

    async function handleSubmit(e){
        e.preventDefault()

        try {
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch(error) {
            console.log(error)
            setLoading(false)
            return setError("Login failed")
        }

        setLoading(false)
    }

    return (
        <Grid container spacing={3} className={classes.flexCenter}>
            <Grid item xs={12} md={2}>
                <Card className={classes.root}>
                    <CardContent>
                    <Typography className={classes.title} gutterBottom>Log in</Typography>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <TextField className={classes.input} id="standard-basic" type="email" required inputRef={emailRef} label="Email" />
                        <TextField className={classes.input} id="standard-basic" type="password" required inputRef={passwordRef} label="Password" />
                        <Button disabled={loading} variant="contained" type="submit">Log in</Button>
                    </form>
                    </CardContent>
                    <CardActions className={classes.column}>
                            <Link to="/forgot">Forgot password?</Link> 
                            <p>Don't have an account? <Link to="/signup">Sign up!</Link> </p>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}
