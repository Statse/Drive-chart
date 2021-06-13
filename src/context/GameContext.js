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
    const [_loading, setLoading] = useState(false)
    const [game, setGame] = useState(false)

    async function getGame(id){
        try {
            const res = await firebase.firestore().collection('games').doc(id).get();
            const data =  res.data() 
            setGame(data)
            setHome(data.home)
            setHomeScore(data.homeScore)
            setAway(data.away)
            setAwayScore(data.awayScore)
            setDowns(data.downs)
            setLoading(false)
            return data
        } catch(e) {
            console.error(e)
            setError(e)
            setLoading(false)
            alert(e)
        }
    }

    function _setDowns(down){
        const newDowns = downs.concat([down])

        setDowns(newDowns)

        return newDowns
    }

    function _updateDown(down, index){
        console.log("_updateDown")
        let newDowns = downs
        newDowns[index] = down
        setDowns(newDowns)

        return newDowns
    }

    // async function submitDown(gameId){
    //     await firebase.firestore()
    //         .collection('games')
    //         .doc(gameId)
    //         .set(
    //             { 
    //                 downs: downs
    //             },
    //             { merge: true }
    //         )
    // }

    const value = {
        _setDowns,
        _updateDown,
        _loading,
        downs,
        getGame,
        game
    }

    return (
        <GameContext.Provider value={value}>
            {!_loading && children}
        </GameContext.Provider>
    )
}
