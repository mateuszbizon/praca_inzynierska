import React, { useState } from "react";
import "../sass/css/navbar.css";
import logo from "../img/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, NavLink } from "react-router-dom";
import SearchMobile from "./SearchMobile";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from "./Sidebar";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false)
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [search, setSearch] = useState('');

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

  function searchUsers(){
    navigate(`/search?search=${search}`);
  }

  function searchUsersByKey(e){
    if(e.keyCode === 13){
      searchUsers();
    }
  }

	return (
		<>
      {user ? (
      <>
        <nav className='navbar'>
          <NavLink to='/'>
            <img src={logo} alt='Kostka Rubika' className='navbar__logo' />
          </NavLink>
          <SearchMobile />
          <div className='navbar__burger'>
            <MenuIcon fontSize='large' className='navbar__burger-icon' onClick={showSidebar}/>
          </div>
          <div className={showSearch ? "search-input active" : "search-input"}>
            <div className="search-icon-box" onClick={showSearchInput}>
              <KeyboardBackspaceIcon fontSize="large" className="search-icon"/>
            </div>
            <input type="text" placeholder="Szukaj..." onKeyDown={searchUsersByKey} value={search} onChange={e => setSearch(e.target.value)}/>
            <button onClick={searchUsers}><SearchIcon /></button>
          </div>
          <div className={showSearch ? "navbar__items--hide" : "navbar__items"}>
            <ul>
              <li className="navbar__item"><NavLink to='/' className='navbar__link'>Strona główna</NavLink></li>
              <li className="navbar__item"><NavLink to='/create' className='navbar__link'>Utwórz</NavLink></li>
              <li className="navbar__item"><NavLink to={`/profile/${user?.result?.username}`} className='navbar__link'>Profil</NavLink></li>
              <li className="navbar__item"><a className="navbar__link" onClick={showSearchInput} >Szukaj</a></li>
              <li className="navbar__item"><a className="navbar__link" onClick={logout}>Wyloguj się</a></li>
            </ul>
          </div>
        </nav>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
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
                  <li className="navbar__item"><NavLink to='/' className='navbar__link'>Strona główna</NavLink></li>
                  <li className="navbar__item"><NavLink to='/login' className='navbar__link'>Logowanie</NavLink></li>
                  <li className="navbar__item"><NavLink to='/register' className='navbar__link'>Rejestracja</NavLink></li>
                  <li className="navbar__item"><NavLink to='/' className='navbar__link'>Nauka</NavLink></li>
                </ul>
              </div>
          </nav>
          <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        </>
      )}
    </>
	);
}

export default Navbar;
