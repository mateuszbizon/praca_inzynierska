import React, { useState } from "react";
import "./navbar.css";
import logo from "../../img/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, NavLink } from "react-router-dom";
import SearchMobile from "../SearchMobile/SearchMobile";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../Sidebar/Sidebar";
import MoreOptions from "../MoreOptions/MoreOptions";
import MoreCreateOptions from "../MoreCreateOptions/MoreCreateOptions";

function Navbar() {
	const [sidebar, setSidebar] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [moreOptions, setMoreOptions] = useState(false);
	const [moreCreateOptions, setMoreCreateOptions] = useState(false);
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user"));
	const [search, setSearch] = useState("");

	function showSidebar() {
		setSidebar(!sidebar);
	}

	function showSearchInput() {
		setShowSearch(!showSearch);
	}

	function showMoreOptions() {
		setMoreCreateOptions(false)
		setMoreOptions(!moreOptions);
	}

	function showMoreCreateOptions() {
		setMoreOptions(false)
		setMoreCreateOptions(!moreCreateOptions);
	}

	function clearOptions() {
		setMoreOptions(false)
		setMoreCreateOptions(false)
	}

	function logout() {
		localStorage.removeItem("user");
		navigate("/login");
	}

	function searchUsers() {
		if (search === "") return

		navigate(`/search?search=${search}`);
	}

	function searchUsersByKey(e) {
		if (e.keyCode === 13) {
			searchUsers();
		}
	}

	const navbarItems = [
		{ text: "Strona główna", path: "/" },
		{ text: "Profil", path: `/profile/${user?.result?.username}` },
	];

	const navbarItemsNotUser = [
		{ text: "Strona główna", path: "/" },
		{ text: "Logowanie", path: "/login" },
		{ text: "Rejestracja", path: "/register" },
		{ text: "Zawody", path: "/contests"}
	];

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
							<MenuIcon
								fontSize='large'
								className='navbar__burger-icon'
								onClick={showSidebar}
							/>
						</div>
						<div
							className={showSearch ? "search-input active" : "search-input"}>
							<div className='search-icon-box' onClick={showSearchInput}>
								<KeyboardBackspaceIcon
									fontSize='large'
									className='search-icon'
								/>
							</div>
							<input
								type='text'
								placeholder='Szukaj...'
								onKeyDown={searchUsersByKey}
								value={search}
								onChange={e => setSearch(e.target.value)}
							/>
							<button onClick={searchUsers}>
								<SearchIcon />
							</button>
						</div>
						<div
							className={showSearch ? "navbar__items--hide" : "navbar__items"}>
							<ul>
								{navbarItems.map((item, index) => (
									<li key={index} className='navbar__item'>
										<NavLink
											to={item.path}
											className='navbar__link'
											activeclassname='active'
											onClick={() => clearOptions(false)}>
											{item.text}
										</NavLink>
									</li>
								))}
								<li className='navbar__item'>
									<a className='navbar__link' onClick={showSearchInput}>
										Szukaj
									</a>
								</li>
								<li className='navbar__item'>
									<a className='navbar__link' onClick={showMoreCreateOptions}>
										Utwórz
									</a>
								</li>
								<li className='navbar__item'>
									<a className='navbar__link' onClick={showMoreOptions}>
										Więcej
									</a>
								</li>
								<li className='navbar__item'>
									<a className='navbar__link' onClick={logout}>
										Wyloguj się
									</a>
								</li>
							</ul>
						</div>
					</nav>
					<Sidebar sidebar={sidebar} setSidebar={setSidebar} />
					<MoreCreateOptions moreCreateOptions={moreCreateOptions} setMoreCreateOptions={setMoreCreateOptions} />
					<MoreOptions
						moreOptions={moreOptions}
						setMoreOptions={setMoreOptions}
					/>
				</>
			) : (
				<>
					<nav className='navbar'>
						<NavLink to='/'>
							<img src={logo} alt='Kostka Rubika' className='navbar__logo' />
						</NavLink>
						<div className='navbar__burger'>
							<MenuIcon
								fontSize='large'
								className='navbar__burger-icon'
								onClick={showSidebar}
							/>
						</div>
						<div className='navbar__items'>
							<ul>
								{navbarItemsNotUser.map((item, index) => (
									<li key={index} className='navbar__item'>
										<NavLink to={item.path} className='navbar__link'>
											{item.text}
										</NavLink>
									</li>
								))}
							</ul>
						</div>
					</nav>
					<Sidebar sidebar={sidebar} setSidebar={setSidebar} />
				</>
			)}
		</>
	);
}

export default Navbar;
