import React from 'react';
import logo from '../../assets/logo.jpg';
import unUser from '../../assets/user.jpg';
import { FaUserCircle } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { useGlobalContex } from '../../hook/useGlobalContext';
import UserImage from '../userImage';

const Nav = () => {
    const { user, setuser } = useGlobalContex()

    // logout funtion
    const signOut = (ev) => {
        ev.preventDefault()
        localStorage.removeItem("accessToken")
        setuser(null)
    }

    return (
        <header className='header'>
            <img src={logo} alt="" />
            <nav>
                <Link to="/">Home</Link>
                {user && <Link to="/profile">Profile</Link>}
                {user ? <button onClick={signOut}>LogOut</button> : <Link to="/login">Login</Link>}
            </nav>
            <div>
               <UserImage></UserImage>
            </div>
        </header>
    );
}

export default Nav;
