import React, { useContext, useEffect, useState } from 'react'
import firebase from '../firebase'

const GameContext = React.createContext()

export function useGame(){
    return useContext(GameContext)
}

export function GameProvider({children}) {
    const [error, setError] = useState(false)
    const [home, setHome] = useState("")
    const [homeScore, setHomeScore] = useState("")
    const [away, setAway] = useState("")
    const [awayScore, setAwayScore] = useState("")
    const [downs, setDowns] = useState([])
    const [loading, setLoading] = useState(false)

    async function getGame(id){
        try {
            const res = await firebase.firestore().collection('games').doc(id).get();
            const data =  res.data()
            console.log("getGame", data)
            setHome(data.home)
            setHomeScore(data.homeScore)
            setAway(data.away)
            setAwayScore(data.awayScore)
            setDowns(data.downs)
            setLoading(false)
        } catch {
            setLoading(false)
            console.log(error)
            setError(error)
        }
    }

    function _setDowns(down){
        console.log("prev downs", downs)
        console.log("_setDowns")
        setDowns(down)
        console.log(downs)
    }

    const value = {
        downs,
        getGame,
        _setDowns
    }

    return (
        <GameContext.Provider value={value}>
            {!loading && children}
        </GameContext.Provider>
    )
}
