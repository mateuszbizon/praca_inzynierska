import React from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SchoolIcon from "@mui/icons-material/School";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CloseIcon from '@mui/icons-material/Close';
import "../sass/css/navbar.css";

function Sidebar({ sidebar, setSidebar, theme, setTheme }) {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user"));
	const currentDarkMode = JSON.parse(localStorage.getItem("darkMode"))

	const sidebarItems = [
		{ text: "Strona główna", icon: <HomeIcon fontSize='large' />, path: "/" },
		{ text: "Utwórz", icon: <AddIcon fontSize='large' />, path: "/create" },
		{ text: "Profil", icon: <EditIcon fontSize='large' />, path: `/profile/${user?.result?.username}`},
		{ text: "Logowanie", icon: <LoginIcon fontSize='large' />, path: "/login" },
		{ text: "Rejestrcja", icon: <HowToRegIcon fontSize='large' />, path: "/register" },
		{ text: "Nauka", icon: <SchoolIcon fontSize='large' />, path: "/" },
	];

	function navigateTo(path){
		navigate(path);
		setSidebar(!sidebar);
	}

  function logout(){
    localStorage.removeItem("user");
    navigate("/login");
  }

  function toggleTheme() {
	setTheme((curr) => (curr === "light" ? "dark" : "light"));
	const darkMode = { value: theme }
	localStorage.setItem("darkMode", JSON.stringify(darkMode));
	setSidebar(!sidebar)
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
				<div className="sidebar__row">
					<div className="sidebar__items" onClick={toggleTheme}>
						<DarkModeIcon fontSize="large" />
						Zmień wygląd
					</div>
				</div>
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
