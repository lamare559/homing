import React from 'react'
import app from '../config/Firebase';

function Searcher() {
    const logout = () => {
        app.auth().signOut();
    }
    return (
        <>
            <p>hello {app.auth().currentUser.displayName}</p>
            <button onClick={logout}>logout</button>
        </>
    )
}

export default Searcher
