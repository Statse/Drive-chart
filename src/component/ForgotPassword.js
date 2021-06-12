import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link } from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

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

export default function ForgotPassword() {
    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const classes = useStyles(); 

    async function handleSubmit(e){
        e.preventDefault()

        try {
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch(error) {
            console.log(error)
            setLoading(false)
            return setError("Failed to reset password")
        }

        setLoading(false)
    }

    return (
        <Grid container spacing={3} className={classes.flexCenter}>
            <Grid item xs={12} md={2}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Log in</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required ref={emailRef}></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Reset password</Button>
                    </Form>
                        <div className="w-100 text-center mt-2">
                        <Link to="/forgot">Forgot password?</Link> 
                        </div>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                <Link to="/login">Login page</Link> 
                </div>
            </Grid>
        </Grid>
    )
}
