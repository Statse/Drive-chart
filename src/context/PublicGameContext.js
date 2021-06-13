import React, { useContext, useState } from 'react'
import firebase from '../firebase'

const PublicGameContext = React.createContext()

export function useGame(){
    return useContext(PublicGameContext)
}

export function GameProvider({children}) {
    const [error, setError] = useState(false)
    const [downs, setDowns] = useState([])
    const [_loading, setLoading] = useState(false)
    const [game, setGame] = useState(false)

    async function getGame(id){
        try {
            const res = await firebase.firestore().collection('games').doc(id).get();
            const data =  res.data() 
            setGame(data)
            setLoading(false)
            return data
        } catch(e) {
            console.error(e)
            setError(e)
            setLoading(false)
            alert(e)
        }
    }
    
    const value = {
        _loading,
        getGame,
        game
    }

    return (
        <PublicGameContext.Provider value={value}>
            {!_loading && children}
        </PublicGameContext.Provider>
    )
}
