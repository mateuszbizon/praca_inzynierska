import React from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CloseIcon from '@mui/icons-material/Close';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import "./sidebar.css";

function Sidebar({ sidebar, setSidebar }) {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user"));

	const sidebarItems = [
		{ text: "Strona główna", icon: <HomeIcon fontSize='large' />, path: "/" },
		{ text: "Utwórz", icon: <AddIcon fontSize='large' />, path: "/create" },
		{ text: "Profil", icon: <EditIcon fontSize='large' />, path: `/profile/${user?.result?.username}`},
		{ text: "Trening", icon: <ViewInArIcon fontSize='large' />, path: "/timer" },
		{ text: "Zawody", icon: <SportsKabaddiIcon fontSize='large' />, path: "/" },
		{ text: "Logowanie", icon: <LoginIcon fontSize='large' />, path: "/login" },
		{ text: "Rejestracja", icon: <HowToRegIcon fontSize='large' />, path: "/register" },
	];

	function navigateTo(path){
		navigate(path);
		setSidebar(!sidebar);
	}

  function logout(){
    localStorage.removeItem("user");
    navigate("/login");
  }

	return (
		<>
			<nav className={sidebar ? "sidebar active" : "sidebar"}>
				<div className="sidebar__close-box">
					<CloseIcon fontSize="large" className="sidebar__close-icon" onClick={() => setSidebar(!sidebar)} />
				</div>
				{sidebarItems.map(item => (
					<div className='sidebar__row'>
						<div className='sidebar__items' onClick={() => navigateTo(item.path)}>
							{item.icon}
							{item.text}
						</div>
					</div>
				))}
				{user && (
					<div className="sidebar__row">
						<div className="sidebar__items" onClick={logout}>
							<LogoutIcon fontSize="large" />
							Wyloguj się
						</div>
					</div>
				)}
			</nav>
		</>
	);
}

export default Sidebar;
