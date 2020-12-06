import React, { useState, useRef} from 'react'
import { Alert} from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from "react-router-dom"

//components
import GamesList from '../component/GamesList'
import NewGame from '../component/NewGame';

import firebase from '../firebase'

export default function Dashboard() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const {currentUser, logout} = useAuth()
    const history = useHistory()
    const homeRef = useRef()
    const awayRef = useRef()
    const userId = firebase.auth().currentUser.uid;

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

    return (
        <>  
            {error && <Alert variant="danger">{error}</Alert>}
            <NewGame />
            <GamesList/>
        </>
    )
}
