import React, { useState} from 'react'
import { Alert} from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from "react-router-dom"

//UI
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';


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
            const res = await firebase.firestore().collection('games').add(data);
            console.log('Added document with ID: ', res.id);
            history.push(`/game/${res.id}`)
        } catch(error) {
            console.log(error)
            setLoading(false)
            return setError(error)
        }
    }

    return (
        <>  
            {error && <Alert variant="danger">{error}</Alert>}
            <Button onClick={newGame} variant="contained" color="secondary">
                New game
            </Button>
          

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
