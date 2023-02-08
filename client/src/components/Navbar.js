import React, { useState } from "react";
import "../sass/css/navbar.css";
import logo from "../img/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import SearchMobile from "./SearchMobile";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from "./Sidebar";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false)
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  function showSidebar(){
    setSidebar(!sidebar)
  }

  function showSearchInput(){
    setShowSearch(!showSearch)
  }

  function logout(){
    localStorage.removeItem("user");
    navigate("/login")
  }

	return (
		<>
      {user ? (
      <>
        <nav className='navbar'>
          <a href='/' title='Strona główna'>
            <img src={logo} alt='Kostka Rubika' className='navbar__logo' />
          </a>
          <SearchMobile />
          <div className='navbar__burger'>
            <MenuIcon fontSize='large' className='navbar__burger-icon' onClick={showSidebar}/>
          </div>
          <div className={showSearch ? "search active" : "search"}>
            <div className="search-icon-box" onClick={showSearchInput}>
              <KeyboardBackspaceIcon fontSize="large" className="search-icon"/>
            </div>
            <input type="text" placeholder="Szukaj..."/>
            <button><SearchIcon /></button>
          </div>
          <div className={showSearch ? "navbar__items--hide" : "navbar__items"}>
            <ul>
              <li className="navbar__item"><a href='/' className="navbar__link">Strona główna</a></li>
              <li className="navbar__item"><a href='/create' className="navbar__link">Utwórz</a></li>
              <li className="navbar__item"><a href={`/profile/${user.result.username}`} className="navbar__link" >Profil</a></li>
              <li className="navbar__item"><a className="navbar__link" onClick={showSearchInput} >Szukaj</a></li>
              <li className="navbar__item"><a className="navbar__link" onClick={logout}>Wyloguj się</a></li>
            </ul>
          </div>
        </nav>
        <Sidebar sidebar={sidebar}/>
      </>
      ) : (
        <>
          <nav className="navbar">
              <a href='/' title='Strona główna'>
                <img src={logo} alt='Kostka Rubika' className='navbar__logo' />
              </a>
              <div className='navbar__burger'>
                <MenuIcon fontSize='large' className='navbar__burger-icon' onClick={showSidebar}/>
              </div>
              <div className="navbar__items">
                <ul>
                  <li className="navbar__item"><a href='/login' className="navbar__link">Logowanie</a></li>
                  <li className="navbar__item"><a href='/register' className="navbar__link">Rejestracja</a></li>
                  <li className="navbar__item"><a href='#' className="navbar__link">Nauka</a></li>
                </ul>
              </div>
          </nav>
          <Sidebar sidebar={sidebar} />
        </>
      )}
    </>
	);
}

export default Navbar;
