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
                const res = await firebase.firestore().collection('games').where('owner', '==', userId).get();
                const data =  res.docs.map(doc => doc.data());
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

    console.log(games)

    return (
        <>
            {!loading && games && (
                <div>
                    {games.map((game)=>{
                        <GameCard gameData={game} />
                    })}
                </div>
            )}
        </>
    )
}
