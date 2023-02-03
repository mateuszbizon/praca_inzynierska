import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './routes/login';
import RegisterPage from './routes/Register';
import HomePage from './routes/Home';
import CreatePage from './routes/Create';
import AuthRoutes from './utils/AuthRoutes';

function App() {
  return (
		<Router>
			<Routes>
				<Route element={<AuthRoutes />}>
					<Route path='/dashboard' element={<HomePage />} exact/>
					<Route path='/create' element={<CreatePage />} />
				</Route>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
			</Routes>
		</Router>
	);
}

export default App;
