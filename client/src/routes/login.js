import React, { useRef, useState } from "react";
import "../sass/css/login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/auth";

function Login() {
	const [form, setForm] = useState({password: "", email: ""});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { authData, error } = useSelector(state => state.auth);
	const submitMessage = useRef();
	const passRef = useRef();
	const emailError = useRef();
	const passError = useRef();

	const showPass = useRef();
	const hidePass = useRef();

	function checkEmail() {
		const emailRegex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (form.email.length == 0) {
			emailError.current.textContent = "Email nie może być pusty";
			emailError.current.style.visibility = "visible";
			return false;
		}

		if (!form.email.match(emailRegex)) {
			emailError.current.textContent = "Nieprawidłowy email";
			emailError.current.style.visibility = "visible";
			return false;
		}

		emailError.current.style.visibility = "hidden";
		return true;
	}

	function checkPassword() {
		if (form.password.length == 0) {
			passError.current.textContent = "Hasło nie może być puste";
			passError.current.style.visibility = "visible";
			return false;
		}

		passError.current.style.visibility = "hidden";
		return true;
	}

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

		if (!checkEmail() || !checkPassword()) {
			return false;
		}

		dispatch(signin(form, navigate));
	}
	return (
		<>
			<section className='login'>
				<div className='login__form'>
					<h1 className='login__heading'>Logowanie</h1>
					<form>
						<div className='login__box'>
							<input type='text' id='email' name='email' onChange={onChange} required />
							<label htmlFor='email'>Adres email</label>
							<p className='login__text-error' ref={emailError}>
								error
							</p>
						</div>
						<div className='login__box'>
							<input type='password' id='password' name='password' onChange={onChange} ref={passRef} required />
							<label htmlFor='password'>Hasło</label>
							<span className='login__password-icons'>
								<VisibilityOffIcon className='hide-password' ref={hidePass} onClick={showPassword} />
								<VisibilityIcon className='show-password' ref={showPass} onClick={showPassword} />
							</span>
							<p className='login__text-error' ref={passError}>
								error
							</p>
						</div>
						<div className='login__btn-box'>
							<button type='submit' onClick={handleSubmit} className='login__submit'> Zaloguj się
							</button>
						</div>
							<p className="login__submit-message" ref={submitMessage}>
								{error ? authData : ""}
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
