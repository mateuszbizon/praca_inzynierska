import React from 'react';
import '../sass/css/homeNavbar.css';
import logo from '../img/logo.png';

function Navbar() {
  return (
    <>
        <nav className='navbar'>
            <a href="/" title="Strona główna">
                <img src={logo} alt="asdasads" className='navbar__logo' />
            </a>
            <div className="navbar__elements">
                <a href="/login" className='navbar__link'>Logowanie</a>
                <a href="/register" className='navbar__link'>Rejestracja</a>
            </div>
        </nav>
    </>
  )
}

export default Navbar;