import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './routes/login';
import RegisterPage from './routes/Register';
import HomePage from './routes/Home';
import CreatePage from './routes/Create';
import ProfilesPage from './routes/Profiles';
import AuthRoutes from './utils/AuthRoutes';
import PostDetails from "./routes/PostDetails";
import Search from "./routes/Search";

function App() {
  return (
		<Router>
			<Routes>
				<Route element={<AuthRoutes />}>
					<Route path='/create' element={<CreatePage />} />
					<Route path='/profile/:username' element={<ProfilesPage />} />
					<Route path='/posts/:id' element={<PostDetails />} />
					<Route path='/search' element={<Search />} />
				</Route>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
			</Routes>
		</Router>
	);
}

export default App;
