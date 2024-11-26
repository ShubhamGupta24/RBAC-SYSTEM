import React, { useState } from 'react';
import './Navbar.css';
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../storeToken/auth";
export const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  return (
    <nav>
      <div className='brand'>
        <Link className='icons' id='brand' to='/' >Office Desk</Link>
      </div>
      <ul className={menuOpen ? 'show' : ""}>
        <NavLink className='icons' id='N' to='/' onClick={() => setMenuOpen(!menuOpen)}>Home</NavLink>
        {isLoggedIn ? (<>
          <NavLink className='icons' id='N' to="/Profile" onClick={() => setMenuOpen(!menuOpen)}>Profile</NavLink>
          <NavLink className='icons' id='N' to="/logout" onClick={() => setMenuOpen(!menuOpen)}>Logout</NavLink>
        </>) : (
          <>
            <NavLink className='icons' id='N' to="/register" onClick={() => setMenuOpen(!menuOpen)}> Register </NavLink>
            <NavLink className='icons' id='N' to="/login" onClick={() => setMenuOpen(!menuOpen)}> Login </NavLink>
          </>

        )}
      </ul>
    </nav>
  );
}
export default Header;
