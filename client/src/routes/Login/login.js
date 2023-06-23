import React, { useRef, useState, useEffect } from "react";
import "./login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin, reset } from "../../actions/auth";
import { CircularProgress } from "@mui/material";
import loginValid from "../../validations/LoginValid";

function Login() {
	const [form, setForm] = useState({ password: "", email: "" });
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { authData, success, loading } = useSelector(state => state.auth);
	const submitMessage = useRef();
	const passRef = useRef();

	const showPass = useRef();
	const hidePass = useRef();

	function showPassword() {
		if (passRef.current.type === "password") {
			passRef.current.type = "text";
			showPass.current.style.display = "block";
			hidePass.current.style.display = "none";
		} else {
			passRef.current.type = "password";
			showPass.current.style.display = "none";
			hidePass.current.style.display = "block";
		}
	}

	function onChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();

		setErrors(loginValid(form));
	}

	useEffect(() => {
		if (
			Object.keys(errors).length === 0 &&
			form.email !== "" &&
			form.password !== ""
		) {
			dispatch(signin(form, navigate));
		}
	}, [errors]);

	useEffect(() => {
		dispatch(reset());
	}, []);

	return (
		<>
			<section className='login'>
				<div className='login__form'>
					<h1 className='login__heading'>Logowanie</h1>
					<form>
						<div className='login__box'>
							<input
								type='text'
								id='email'
								name='email'
								onChange={onChange}
								required
							/>
							<label htmlFor='email'>Adres email</label>
							<p
								className={
									errors.email
										? "login__text-error login__show-input-error"
										: "login__text-error"
								}>
								{errors.email ? errors.email : "error"}
							</p>
						</div>
						<div className='login__box'>
							<input
								type='password'
								id='password'
								name='password'
								onChange={onChange}
								ref={passRef}
								required
							/>
							<label htmlFor='password'>Hasło</label>
							<span className='login__password-icons'>
								<VisibilityOffIcon
									className='hide-password'
									ref={hidePass}
									onClick={showPassword}
								/>
								<VisibilityIcon
									className='show-password'
									ref={showPass}
									onClick={showPassword}
								/>
							</span>
							<p
								className={
									errors.password
										? "login__text-error login__show-input-error"
										: "login__text-error"
								}>
								{errors.password ? errors.password : "error"}
							</p>
						</div>
						<div className='login__btn-box'>
							<button
								type='submit'
								onClick={handleSubmit}
								className='login__submit'>
								Zaloguj się{" "}
								{loading && (
									<CircularProgress size='25px' style={{ color: "#fff" }} />
								)}
							</button>
						</div>
						<p className='login__submit-message' ref={submitMessage}>
							{!success && authData}
						</p>
						<div className='login__info-box'>
							<p className='login__info'>Nie masz konta?</p>
							<a className='login__link' href='/register'>
								Zarejestruj się
							</a>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}

export default Login;
