import React, { useContext, useEffect, useState } from 'react'

const GameContext = React.createContext()

export function useGame(){
    return useContext(GameContext)
}

export function GameProvider({children}) {
    const [game, setGame] = useState([])
    const [loading, setLoading] = useState(true)

    function name(params) {
        //do stuff
    }

    const value = {
    }

    return (
        <GameContext.Provider value={value}>
            {!loading && children}
        </GameContext.Provider>
    )
}
