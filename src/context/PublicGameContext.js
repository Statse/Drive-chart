import React, { useContext, useState } from 'react'
const axios = require('axios').default;

const PublicGameContext = React.createContext()

export function usePublicGame(){
    return useContext(PublicGameContext)
}

export function PublicGameProvider({children}) {
    const [error, setError] = useState(false)
    const [_loading, setLoading] = useState(false)
    const [game, setGame] = useState(false)

    async function getGame(id){
        try {
            const res = await axios("https://us-central1-drive-chart-df487.cloudfunctions.net/app/recap/"+id)
            console.log("res", res.data)
            setGame(res.data)
            setLoading(false)
            return res.data
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
