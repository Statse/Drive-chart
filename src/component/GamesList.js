import React, { useState, useEffect} from 'react'
import firebase from '../firebase'
import GameCard from './GameCard'
import Grid from '@material-ui/core/Grid';

export default function GamesList() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const userId = firebase.auth().currentUser.uid;

    useEffect(()=>{
        setError("")
        setGames([])
        setLoading(true)
        const getGames = async () => {
            try {
                const snapshot = await firebase.firestore().collection('games').where('owner', '==', userId).get();
                const data =  snapshot.docs.map(doc =>{
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                 
                });
            setGames(data)
            setLoading(false)
            } catch (e) {
                alert(e)
                console.error(e)
                setError(e)
                setLoading(false)
                return e
            }
          };
        getGames();
    }, [error, userId])

    return (
        <Grid 
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
            {!loading && games && (
                <Grid>
                    <h3>Pelit</h3>
                    {games.map(game=>{
                        return <GameCard 
                            home={game.home}
                            homeScore={game.homeScore}
                            away={game.away}
                            awayScore={game.awayScore}
                            id={game.id}
                        />
                    })}
                </Grid>
            )}
        </Grid>
    )
}
