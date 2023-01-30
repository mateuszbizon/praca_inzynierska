import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './routes/login';
import RegisterPage from './routes/Register';
import HomePage from './routes/Home';
import CreatePage from './routes/Create';

function App() {
  return (
		<Router>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/create' element={<CreatePage />} />
			</Routes>
		</Router>
	);
}

export default App;
