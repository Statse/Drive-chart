import React, { useContext, useEffect, useState } from 'react'
import {auth} from "../firebase"

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        //if you want to use different sign in just change this function. 
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {

        console.log(email)
        //if you want to use different login just change this function. 
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        //if you want to use different login just change this function. 
        return auth.signOut()
    }

    function resetPassword(email) {
        //if you want to use different login just change this function. 
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }
    
    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

 

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
