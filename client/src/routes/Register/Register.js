import React, { useRef, useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/auth";
import { CircularProgress } from "@mui/material";
import registerValid from "../../validations/RegisterValid";

function Register() {
	const [form, setForm] = useState({
		name: "",
		surname: "",
		email: "",
		username: "",
		password: "",
	});
	const [errors, setErrors] = useState({})
	const dispatch = useDispatch();
	const { authData, error, loading } = useSelector(state => state.auth);
	const navigate = useNavigate();
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

		setErrors(registerValid(form))
	}

	function checkIfValuesAreEmpty() {
		for (const element in form) {
			if (form[element] === "") {
				return true
			}
		}
		return false
	}

	useEffect(() => {
		if (Object.keys(errors).length === 0 && !checkIfValuesAreEmpty()) {
			dispatch(signup(form, navigate));
		}
	}, [errors])

	return (
		<>
			<section className='register'>
				<div className='register__form'>
					<h1 className='register__heading'>Rejestracja</h1>
					<form>
						<div className='register__row'>
							<div className='register__box'>
								<input
									type='text'
									id='name'
									name='name'
									onChange={onChange}
									required
								/>
								<label htmlFor='name'>Imię</label>
								<p className={errors.name ? "register__text-error register__show-input-error" : "register__text-error"} >
								{errors.name ? errors.name : "error"}
								</p>
							</div>

							<div className='register__box'>
								<input
									type='text'
									id='surname'
									name='surname'
									onChange={onChange}
									required
								/>
								<label htmlFor='surname'>Nazwisko</label>
								<p className={errors.surname ? "register__text-error register__show-input-error" : "register__text-error"} >
								{errors.surname ? errors.surname : "error"}
								</p>
							</div>
						</div>

						<div className='register__row'>
							<div className='register__box'>
								<input
									type='text'
									id='username'
									name='username'
									onChange={onChange}
									required
								/>
								<label htmlFor='username'>Nazwa użytkownika</label>
								<p className={errors.username ? "register__text-error register__show-input-error" : "register__text-error"} >
								{errors.username ? errors.username : "error"}
								</p>
							</div>

							<div className='register__box'>
								<input
									type='text'
									id='email'
									name='email'
									onChange={onChange}
									required
								/>
								<label htmlFor='email'>Adres email</label>
								<p className={errors.email ? "register__text-error register__show-input-error" : "register__text-error"} >
								{errors.email ? errors.email : "error"}
								</p>
							</div>
						</div>
						<div className='register__row'>
							<div className='register__box register__box--full-row'>
								<input
									type='password'
									id='password'
									name='password'
									ref={passRef}
									onChange={onChange}
									required
								/>
								<label htmlFor='password'>Hasło</label>
								<span className='register__password-icons'>
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
								<p className={errors.password ? "register__text-error register__show-input-error" : "register__text-error"} >
									{errors.password ? errors.password : "error"}
								</p>
							</div>
						</div>
						<div className='register__btn-box'>
							<button
								type='submit'
								onClick={handleSubmit}
								className='register__submit'>
								Zarejestruj się{" "}
								{loading && (
									<CircularProgress size='25px' style={{ color: "#fff" }} />
								)}
							</button>
						</div>
						<p className='login__submit-message' ref={submitMessage}>
							{error ? authData : ""}
						</p>
						<div className='register__info-box'>
							<p className='register__info'>Masz już konto?</p>
							<a className='register__link' href='/login'>
								Zaloguj się
							</a>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}

export default Register;
