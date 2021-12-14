import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";

const NavAuthLinks = ({ isAuthenticated, currentUser, logout, handleSignIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      handleSignIn();
      navigate('/');
    }
    
    if (isAuthenticated === false) {
        return (
            <>
                <li className="nav-item">
                    <NavLink to='/signin' className="nav-link">Sign In</NavLink>
                </li>
                <li className="nav-item ">
                    <NavLink to='/register' className="nav-link">Register</NavLink>
                </li>
            </>
        )
    }
    else {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/#" id="dropdown07" data-toggle="dropdown" aria-expanded="false">Welcome, {currentUser}!</a>
                <div className="dropdown-menu" aria-labelledby="dropdown07">
                    <button className="dropdown-item " onClick={handleLogout}>Logout</button>
                </div>
            </li>
        )
    }
}

export default NavAuthLinks;
