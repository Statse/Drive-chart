import React, { useState} from 'react'
import {Card, Button, Alert} from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from "react-router-dom"
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import firebase from '../firebase'

export default function Dashboard() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")
        try {
            await logout()
            history.push("/login")
        } catch(error) {
            console.log(error)
            setLoading(false)
            return setError("Logout failed")
        }
    }

    async function newGame() {
        setError("")
        const data = {
            home: "pats",
            away: "seattle"
        }
        try {
            await firebase.firestore().collection('games').add(data);
        } catch(error) {
            console.log(error)
            setLoading(false)
            return setError("Creating new game failed")
        }
    }

    return (
        <>  
            {error && <Alert variant="danger">{error}</Alert>}
            <Tooltip title="Add" aria-label="add" onClick={newGame}>
                <Fab color="primary">
                    <AddIcon />
                </Fab>
            </Tooltip>
            New game

            {/* <Card>
                <Card.Body> */}
                    {/* <h2 className="text-center mb-4">Profile</h2>
                    <strong>Email: </strong>{currentUser.email}
                   <Link className="btn btn-primary w-100 mt-3" to="/update-profile">Update profile</Link> */}
                {/* </Card.Body>
            </Card> */}
            {/* <div className="w-100 text-center mt-2">
                <Button disabled={loading} variant="link" onClick={handleLogout}>Log out</Button>
            </div> */}
        </>
    )
}
