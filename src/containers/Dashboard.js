import React, { useState, useRef} from 'react'
import { Alert} from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from "react-router-dom"

//components
import GamesList from '../component/GamesList'
import NewGame from '../component/NewGame';

//material ui
import Grid from '@material-ui/core/Grid';

import firebase from '../firebase'

export default function Dashboard() {
    // const [error, setError] = useState("")
    // const [loading, setLoading] = useState(false)

    return (
        <Grid container spacing={3}>
            <NewGame />
            <GamesList/>
        </Grid>
    )
}
