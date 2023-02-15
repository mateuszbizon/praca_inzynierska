import React from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SchoolIcon from "@mui/icons-material/School";
import "../sass/css/navbar.css";

function Sidebar({ sidebar }) {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user"));

	const sidebarItems = [
		{ text: "Strona główna", icon: <HomeIcon fontSize='large' />, path: "/" },
		{ text: "Utwórz", icon: <AddIcon fontSize='large' />, path: "/create" },
		{ text: "Profil", icon: <EditIcon fontSize='large' />, path: `/profile/${user?.result?.username}`},
		{ text: "Logowanie", icon: <LoginIcon fontSize='large' />, path: "/login" },
		{ text: "Rejestrcja", icon: <HowToRegIcon fontSize='large' />, path: "/register" },
		{ text: "Nauka", icon: <SchoolIcon fontSize='large' />, path: "/" },
	];

  function logout(){
    localStorage.removeItem("user");
    navigate("/login");
  }

	return (
		<>
			<nav className={sidebar ? "sidebar active" : "sidebar"}>
				{sidebarItems.map(item => (
					<div className='sidebar__row'>
						<div className='sidebar__items' onClick={() => navigate(item.path)}>
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
