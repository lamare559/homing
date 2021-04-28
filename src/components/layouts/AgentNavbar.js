import React from 'react'
import '../styles/Navbar.css'
import {Link, NavLink} from 'react-router-dom'
import {Menu, Notifications} from '@material-ui/icons'
import app from '../config/Firebase'


function AgentNavbar() {
    const photoUrl = app.auth().currentUser.photoURL;
    const logout = () => app.auth().signOut();
    return (
        <div>
            <nav className="navbar border-bottom navbar-expand-lg fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="/agent">Prototype</a>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarText" 
                        aria-controls="navbarText" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                        <span 
                            style={{
                                color: "#fdfffc", 
                                fontSize: "16px", 
                                fontWeight: "500"
                            }} 
                            className="navbar-toggler-icon text-white"
                        >
                            <Menu />
                        </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item px-2">
                                <NavLink 
                                    exact 
                                    activeClassName="active" 
                                    className="nav-link" 
                                    to="/agent/apartments"
                                >
                                    Apartments
                                </NavLink>
                            </li>
                            <li className="nav-item px-2">
                                <NavLink 
                                    exact 
                                    activeClassName="active" 
                                    className="nav-link" 
                                    to="/agent/studios"
                                >
                                    Studios
                                </NavLink>
                            </li>
                            <li className="nav-item px-2">
                                <Link className="nav-link" to="/agent/chat">Chat</Link>
                            </li>
                            <li className="nav-item px-2">
                                <NavLink 
                                    exact 
                                    activeClassName="active" 
                                    className="nav-link" 
                                    to="/agent/about"
                                >
                                    About
                                </NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link">
                                    <Notifications />
                                </Link>
                            </li>
                            {photoUrl ? (
                                <li className="nav-item dropdown">
                                    <Link 
                                        className="nav-link dropdown-toggle" 
                                        id="userDropdown" 
                                        data-toggle="dropdown" 
                                        aria-haspopup="true" 
                                        aria-expanded="false"
                                    >
                                        <img 
                                            className="avatar" 
                                            src={photoUrl} 
                                            alt="avatar"
                                        />
                                    </Link>
                                    <div 
                                        className="dropdown-menu dropdown-menu-right" 
                                        aria-labelledby="userDropdown"
                                    >
                                        <Link 
                                            className="dropdown-item" 
                                            to="/agent/account"
                                        >
                                            Account
                                        </Link>
                                        <Link 
                                            className="dropdown-item" 
                                            to="/agent/rent-estate"
                                        >
                                            Rent
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <Link className="dropdown-item">Log Out</Link>
                                    </div>
                                </li>
                            ) : (
                                <li className="nav-item dropdown">
                                    <Link 
                                        className="nav-link dropdown-toggle" 
                                        id="userDropdown"
                                        data-toggle="dropdown" 
                                        aria-haspopup="true" 
                                        aria-expanded="false"
                                    >
                                        <img 
                                            className="avatar" 
                                            src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3" 
                                            alt="avatar"
                                        />
                                    </Link>
                                    <div 
                                        className="dropdown-menu dropdown-menu-right" 
                                        aria-labelledby="userDropdown"
                                    >
                                        <Link className="dropdown-item" to="/agent/account">Account</Link>
                                        <Link className="dropdown-item" to="/agent/rent-estate">Rent</Link>
                                        <div className="dropdown-divider"></div>
                                        <Link onClick={logout} className="dropdown-item">Log Out</Link>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AgentNavbar
