import React, { useState, useEffect} from 'react'
import firebase from '../firebase'

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
                // const data =  res.data()
                console.log("this is loaded ", data)
            setGames(data)
            } catch {
                setLoading(false)
                console.log(error)
                setError(error)
            }
          };
       
          getGames();
        // async function getGames(){
        //     try {
        //         const res = await firebase.firestore().collection('games')
        //         const data =  res.data()
        //         console.log("this is loaded ", data)
        //         setGames(data)
        //     } catch {
        //         setLoading(false)
        //         console.log(error)
        //         setError(error)
        //     }
        // }
    }, [error])

    console.log(games)

    return (
        <>
            {loading && (
                <div>
                    
                </div>
            )}
        </>
    )
}
