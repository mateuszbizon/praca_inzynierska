import React, { useState } from "react";
import "../sass/css/navbar.css";
import logo from "../img/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  function showSidebar(){
    setSidebar(!sidebar)
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
          <div className='navbar__burger'>
            <MenuIcon fontSize='large' className='navbar__burger-icon' onClick={showSidebar}/>
          </div>
          <div className="navbar__items">
            <ul>
              <li className="navbar__item"><a href='/' className="navbar__link">Strona główna</a></li>
              <li className="navbar__item"><a href='/create' className="navbar__link">Utwórz</a></li>
              <li className="navbar__item"><a href={`/profile/${user.result.username}`} className="navbar__link" >Profil</a></li>
              <li className="navbar__item"><a className="navbar__link" onClick={logout}>Wyloguj się</a></li>
            </ul>
          </div>
        </nav>

        <nav className={sidebar ? 'sidebar active' : 'sidebar'}>
          <div className="sidebar__row">
            <div className='sidebar__items' onClick={() => navigate('/')}>
              <div className='sidebar__icons'>
                <HomeIcon fontSize='large' className='sidebar__icon' />
              </div>
              <div className="sidebar__text">
                Strona główna
              </div>
            </div>
          </div>
          <div className="sidebar__row">
            <div className='sidebar__items' onClick={() => navigate('/create')}>
              <div className='sidebar__icons'>
                  <AddIcon fontSize='large' className='sidebar__icon' />
              </div>
              <div className="sidebar__text">
                Utwórz
              </div>
            </div>
          </div>
          <div className="sidebar__row">
            <div className='sidebar__items' onClick={() => navigate(`/profile/${user.result.username}`)}>
              <div className='sidebar__icons'>
                  <EditIcon fontSize='large' className='sidebar__icon' />
              </div>
              <div className="sidebar__text">
              Profil
              </div>
            </div>
          </div>
          <div className="sidebar__row">
            <div className='sidebar__items' onClick={logout}>
              <div className='sidebar__icons'>
                  <LogoutIcon fontSize='large' className='sidebar__icon' />
              </div>
              <div className="sidebar__text">
                Wyloguj się
              </div>
            </div>
          </div>
        </nav>
      </>
      ) : (
        <nav className="navbar">
            <a href='/' title='Strona główna'>
              <img src={logo} alt='Kostka Rubika' className='navbar__logo' />
            </a>
            <div className="navbar__items">
              <ul>
                <li className="navbar__item"><a href='/login' className="navbar__link">Logowanie</a></li>
                <li className="navbar__item"><a href='register' className="navbar__link">Rejestracja</a></li>
              </ul>
            </div>
        </nav>
      )}
    </>
	);
}

export default Navbar;
