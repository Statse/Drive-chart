import React, { useState, useEffect} from 'react'
import firebase from '../firebase'
import GameCard from './GameCard'

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
            } catch {
                setLoading(false)
                console.log(error)
                setError(error)
            }
          };
        getGames();
    }, [error])

    return (
        <>
            {!loading && games && (
                <div>
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
                </div>
            )}
        </>
    )
}
