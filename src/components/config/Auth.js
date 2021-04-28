import React, {useEffect, useState} from 'react'
import app from './Firebase'
import LoaderSpinner from '../../img/712.gif'

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        });
    }, []);

    const loaderStyle = {
        position: "fixed",
        top: "50%",
        left: "50%"
    }

    if(pending) {
        return (
            <>
                <img style={loaderStyle} src={LoaderSpinner} alt="loading...." />
            </>
        )
    }

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

