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
import EditContest from "./routes/EditContest/EditContest";
import ContestDetails from "./routes/ContestDetails/ContestDetails";
import LiveResults from "./routes/LiveResults/LiveResults";
import AddUserTime from "./routes/AddUserTime/AddUserTime";
import VerifyRegisterEmail from "./routes/VerifyRegisterEmail/VerifyRegisterEmail";
import ResetPassword from "./routes/ResetPassword/ResetPassword";
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
					<Route path="/edit-contest/:id" element={<EditContest />} />
					<Route path='/live-results/:id/:event/submit' element={<AddUserTime />} />
				</Route>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/contests' element={<ContestsDashboard />} />
				<Route path='/contests/:id' element={<ContestDetails />} />
				<Route path='/live-results/:id/:event' element={<LiveResults />} />
				<Route path='/users/:id/verify/:token' element={<VerifyRegisterEmail />} />
				<Route path="/reset-password" element={<ResetPassword />} />
			</Routes>
		</Router>
	);
}

export default App;
