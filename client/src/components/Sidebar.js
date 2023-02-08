import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SchoolIcon from '@mui/icons-material/School';
import "../sass/css/navbar.css";

function Sidebar({sidebar}) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    function logout(){
        localStorage.removeItem("user");
        navigate("/login")
      }
    
  return (
    <>
        <nav className={sidebar ? "sidebar active" : "sidebar"}>
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
          <div className="sidebar__row">
            <div className='sidebar__items' onClick={() => navigate(`/login`)}>
              <div className='sidebar__icons'>
                  <LoginIcon fontSize='large' className='sidebar__icon' />
              </div>
              <div className="sidebar__text">
                Logowanie
              </div>
            </div>
          </div>
          <div className="sidebar__row">
            <div className='sidebar__items' onClick={() => navigate(`/register`)}>
              <div className='sidebar__icons'>
                  <HowToRegIcon fontSize='large' className='sidebar__icon' />
              </div>
              <div className="sidebar__text">
                Rejestracja
              </div>
            </div>
          </div>
          <div className="sidebar__row">
            <div className='sidebar__items' onClick={() => navigate(`/`)}>
              <div className='sidebar__icons'>
                  <SchoolIcon fontSize='large' className='sidebar__icon' />
              </div>
              <div className="sidebar__text">
                Nauka
              </div>
            </div>
          </div>
        </nav>
    </>
  )
}

export default Sidebar