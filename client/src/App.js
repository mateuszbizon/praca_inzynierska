import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './routes/login';
import RegisterPage from './routes/Register';
import HomePage from './routes/Home';
import CreatePage from './routes/Create';
import ProfilesPage from './routes/Profiles';
import AuthRoutes from './utils/AuthRoutes';
import PostDetails from "./routes/PostDetails";
import Search from "./routes/Search";
import Navbar from "./components/Navbar";
import EditAccount from "./routes/EditAccount";
import { createContext, useState } from "react";
import './app.css';

export const ThemeContext = createContext(null);

function App() {
	const [theme, setTheme] = useState("light");
	const darkMode = JSON.parse(localStorage.getItem("darkMode"))

  return (
	<ThemeContext.Provider value={{theme}}>
		<div className="App" id={siema ? darkMode.value : theme}>
			<Router>
				<Navbar theme={theme} setTheme={setTheme} />
				<Routes>
					<Route element={<AuthRoutes />}>
						<Route path='/create' element={<CreatePage />} />
						<Route path='/profile/:username' element={<ProfilesPage />} />
						<Route path='/posts/:id' element={<PostDetails />} />
						<Route path='/search' element={<Search />} />
						<Route path='/edit-account' element={<EditAccount />} />
					</Route>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
				</Routes>
			</Router>
		</div>
	</ThemeContext.Provider>
	);
}

export default App;
