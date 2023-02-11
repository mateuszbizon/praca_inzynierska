import React, { useRef, useState } from 'react'
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import '../sass/css/register.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/auth';

function Register() {
    const [form, setForm] = useState({name: '', surname: '', email: '', username: '', password: ''});
    const dispatch = useDispatch();
    const { authData, error} = useSelector(state => state.auth)
    const navigate = useNavigate();
    const submitMessage = useRef();
    const passRef = useRef();
    const emailError = useRef();
    const passError = useRef();
    const nameError = useRef();
    const surnameError = useRef();
    const usernameError = useRef();

    const showPass = useRef();
	const hidePass = useRef();

    function checkEmail(){
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(form.email.length == 0){
            emailError.current.textContent = 'Email nie może być pusty';
			emailError.current.style.visibility = 'visible';
            return false;
        }

        if(!form.email.match(emailRegex)){
            emailError.current.textContent = 'Nieprawidłowy email';
			emailError.current.style.visibility = 'visible';
            return false;
        }

		emailError.current.style.visibility = 'hidden';
        return true;
    }

	function checkPassword(){
		if(form.password.length == 0){
            passError.current.textContent = 'Hasło nie może być puste';
			passError.current.style.visibility = 'visible';
            return false;
        }

		if(form.password.length < 7){
            passError.current.textContent = 'Hasło musi zawierać co najmniej 7 znaków';
			passError.current.style.visibility = 'visible';
            return false;
        }

		passError.current.style.visibility = 'hidden';
		return true;
	}

    function checkName(){
        if(form.name.length == 0){
            nameError.current.textContent = 'Imię nie może być puste';
			nameError.current.style.visibility = 'visible';
            return false;
        }

		nameError.current.style.visibility = 'hidden';
		return true;
    }

    function checkSurname(){
        if(form.surname.length == 0){
            surnameError.current.textContent = 'Nazwisko nie może być puste';
			surnameError.current.style.visibility = 'visible';
            return false;
        }

		surnameError.current.style.visibility = 'hidden';
		return true;
    }

    function checkUsername(){
        if(form.username.length == 0){
            usernameError.current.textContent = 'Nazwa użytkownika nie może być pusta';
			usernameError.current.style.visibility = 'visible';
            return false;
        }

		usernameError.current.style.visibility = 'hidden';
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

    function onChange(e){
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e){
		e.preventDefault();

		if(!checkEmail() || !checkPassword() || !checkUsername() || !checkName() || !checkSurname()){
			return false;
		}

        dispatch(signup(form, navigate));
	}

  return (
    <>
        <section className="register">
            <div className="register__form">
                <h1 className="register__heading">Rejestracja</h1>
                <form>

                    <div className="register__row">
                        <div className="register__box">
                            <input type='text' id='name' name='name' onChange={onChange} required/>
                            <label htmlFor='name'>Imię</label>
                            <p className="register__text-error" ref={nameError}>error</p>
                        </div>
                        
                        <div className="register__box">
                            <input type='text' id='surname' name='surname' onChange={onChange} required/>
                            <label htmlFor='surname'>Nazwisko</label>
                            <p className="register__text-error" ref={surnameError}>error</p>
                        </div>
                    </div>

                    <div className="register__row">
                        <div className="register__box">
                            <input type='text' id='username' name='username' onChange={onChange} required/>
                            <label htmlFor='username'>Nazwa użytkownika</label>
                            <p className="register__text-error" ref={usernameError}>error</p>
                        </div>

                        <div className="register__box">
                            <input type='text' id='email' name='email' onChange={onChange} required/>
                            <label htmlFor='email'>Adres email</label>
                            <p className="register__text-error" ref={emailError}>error</p>
                        </div>
                    </div>
                    <div className="register__row">
                        <div className="register__box register__box--full-row">
                            <input type='password' id='password' name='password' ref={passRef} onChange={onChange} required/>
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
                            <p className="register__text-error" ref={passError}>error</p>
                        </div>
                    </div>
                    <div className='register__btn-box'>
                        <button type='submit' onClick={handleSubmit} className='register__submit'>
                            Zarejestruj się
                        </button>
                    </div>
                    <p className="login__submit-message" ref={submitMessage}>
                        {error ? authData : ""}
                    </p>
                    <div className="register__info-box">
                        <p className='register__info'>Masz już konto?</p>
                        <a className='register__link' href='/login'>
                            Zaloguj się
                        </a>
                    </div>
                </form>
            </div>
        </section>
    </>
  )
}

export default Register