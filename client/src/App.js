import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoutes from "./utils/AuthRoutes";
import AdminRoutes from "./utils/AdminRoutes";
import LoginPage from "./routes/Login/login";
import RegisterPage from "./routes/Register/Register";
import HomePage from "./routes/Home/Home";
import CreatePage from "./routes/CreatePost/CreatePost";
import CreateTutorialPage from "./routes/CreateTutorial/CreateTutorial";
import ProfilesPage from "./routes/Profiles/Profiles";
import PostDetails from "./routes/PostDetails/PostDetails";
import Search from "./routes/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import EditAccount from "./routes/EditAccount/EditAccount";
import Timer from "./routes/Timer/Timer";
import TimesHistory from "./routes/TimesHistory/TimesHistory";
import TutorialDetails from "./routes/TutorialDetails/TutorialDetails";
import EditTutorial from "./routes/EditTutorial/EditTutorial";
import ContestsDashboard from "./routes/ContestsDashboard/ContestsDashboard";
import CreateContest from "./routes/CreateContest/CreateContest";
import "./app.css";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route element={<AuthRoutes />}>
					<Route path='/create-post' element={<CreatePage />} />
					<Route path='/create-tutorial' element={<CreateTutorialPage />} />
					<Route path='/edit-tutorial/:id' element={<EditTutorial />} />
					<Route path='/profile/:username' element={<ProfilesPage />} />
					<Route path='/posts/:id' element={<PostDetails />} />
					<Route path='/tutorials/:id' element={<TutorialDetails />} />
					<Route path='/search' element={<Search />} />
					<Route path='/edit-account' element={<EditAccount />} />
					<Route path='/timer' element={<Timer />} />
					<Route path='/times-history' element={<TimesHistory />} />
				</Route>
				<Route element={<AdminRoutes />}>
					<Route path="/create-contest" element={<CreateContest />} />
				</Route>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/contests' element={<ContestsDashboard />} />
			</Routes>
		</Router>
	);
}

export default App;
