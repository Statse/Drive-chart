import React, { useContext, useState } from 'react'
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
        // console.log("getGame",  id)
        try {
            const res = await firebase.firestore().collection('games').doc(id).get();
            const data =  res.data()
            setHome(data.home)
            setHomeScore(data.homeScore)
            setAway(data.away)
            setAwayScore(data.awayScore)
            console.log(data.downs)
            setDowns(data.downs)
            setLoading(false)
            return data
        } catch(e) {
            console.log(e)
            setError(e)
            setLoading(false)
        }
    }

    function _setDowns(down){
        const data = downs.concat([down])

        setDowns(data)

        return data
    }

    function _updateDown(down, index){
        const data = downs[index] = down
        
        setDowns(data)

        return data
    }

    async function submitDown(gameId){
        await firebase.firestore()
            .collection('games')
            .doc(gameId)
            .set(
                { 
                    downs: downs
                },
                { merge: true }
            )
    }

    const value = {
        _setDowns,
        downs,
        getGame,
    }

    return (
        <GameContext.Provider value={value}>
            {!loading && children}
        </GameContext.Provider>
    )
}
