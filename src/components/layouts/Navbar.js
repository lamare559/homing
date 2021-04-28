import React from 'react'
import {AddCircleOutline} from '@material-ui/icons'
import '../styles/Navbar.css';
import {Link, NavLink} from 'react-router-dom'
import {Menu} from '@material-ui/icons'

function Navbar() {
    return (
        <div>
            <nav className="navbar border-bottom navbar-expand-lg fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="/">Prototype</a>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarText" 
                        aria-controls="navbarText" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
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
                                    to="/apartments"
                                >
                                    Apartments
                                </NavLink>
                            </li>
                            <li className="nav-item px-2">
                                <NavLink 
                                    exact
                                    activeClassName="active"  
                                    className="nav-link" 
                                    to="/studios"
                                >
                                    Studios
                                </NavLink>
                            </li>
                            <li className="nav-item px-2">
                                <NavLink 
                                    exact
                                    activeClassName="active"
                                    className="nav-link" 
                                    to="/agents"
                                >
                                    Agents
                                </NavLink>
                            </li>
                            <li className="nav-item px-2">
                                <Link
                                    exact
                                    activeClassName="active" 
                                    className="nav-link" 
                                    to="/proprietors"
                                >
                                    Proprietors
                                </Link>
                            </li>
                            <li className="nav-item px-2">
                                <Link
                                    exact
                                    activeClassName="active" 
                                    className="nav-link" 
                                    to="/about"
                                >
                                    About
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item px-2">
                                <Link className="nav-link" to="/signin">Sign In</Link>
                            </li>
                            <button className="btn-rent">
                                <Link className="link" to="/agent-signin">
                                    <AddCircleOutline /> Rent
                                </Link>
                            </button>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
