import React, { useRef } from 'react'
import HomeNavbar from "../components/homeNavbar";
import '../sass/css/register.css';

function Register() {
    const emailRef = useRef();
	const passRef = useRef();
	const repeatPassRef = useRef();
	const nameRef = useRef();
	const surnameRef = useRef();
	const usernameRef = useRef();
    const emailError = useRef();
    const passError = useRef();
    const repeatPassError = useRef();
    const nameError = useRef();
    const surnameError = useRef();
    const usernameError = useRef();

    function checkEmail(){
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let email = emailRef.current.value;

        if(email.length == 0){
            emailError.current.textContent = 'Email nie może być pusty';
			emailError.current.style.visibility = 'visible';
            return false;
        }

        if(!email.match(emailRegex)){
            emailError.current.textContent = 'Nieprawidłowy email';
			emailError.current.style.visibility = 'visible';
            return false;
        }

        emailError.current.textContent = '';
		emailError.current.style.visibility = 'hidden';
        return true;
    }

	function checkPassword(){
		let password = passRef.current.value;

		if(password.length == 0){
            passError.current.textContent = 'Hasło nie może być puste';
			passError.current.style.visibility = 'visible';
            return false;
        }

		if(password.length < 7){
            passError.current.textContent = 'Hasło musi zawierać co najmniej 7 znaków';
			passError.current.style.visibility = 'visible';
            return false;
        }

		passError.current.textContent = '';
		passError.current.style.visibility = 'hidden';
		return true;
	}

    function checkRepeatPassword(){
        let password = passRef.current.value;
        let repeatpassword = repeatPassRef.current.value;

        if(password !== repeatpassword){
            repeatPassError.current.textContent = 'Hasła muszą być takie same';
			repeatPassError.current.style.visibility = 'visible';
            return false;
        }

        repeatPassError.current.textContent = '';
		repeatPassError.current.style.visibility = 'hidden';
		return true;
    }

    function checkName(){
        let name = nameRef.current.value;

        if(name.length == 0){
            nameError.current.textContent = 'Imię nie może być puste';
			nameError.current.style.visibility = 'visible';
            return false;
        }

        nameError.current.textContent = '';
		nameError.current.style.visibility = 'hidden';
		return true;
    }

    function checkSurname(){
        let surname = surnameRef.current.value;

        if(surname.length == 0){
            surnameError.current.textContent = 'Nazwisko nie może być puste';
			surnameError.current.style.visibility = 'visible';
            return false;
        }

        surnameError.current.textContent = '';
		surnameError.current.style.visibility = 'hidden';
		return true;
    }

    function checkUsername(){
        let username = usernameRef.current.value;

        if(username.length == 0){
            usernameError.current.textContent = 'Nazwa użytkownika nie może być pusta';
			usernameError.current.style.visibility = 'visible';
            return false;
        }

        usernameError.current.textContent = '';
		usernameError.current.style.visibility = 'hidden';
		return true;
    }

    function handleSubmit(e){
		e.preventDefault();

		if(!checkEmail() || !checkPassword() || !checkUsername() || !checkName() || !checkSurname() || !checkRepeatPassword()){
			return false;
		}

		console.log('submitted');
	}

  return (
    <>
        <HomeNavbar />
        <section className="register">
            <div className="register__form">
                <h1 className="register__heading">Rejestracja</h1>
                <form>

                    <div className="register__row">
                        <div className="register__box">
                            <input type='text' id='name' ref={nameRef} required/>
                            <label htmlFor='name'>Imię</label>
                            <p className="register__text-error" ref={nameError}>error</p>
                        </div>
                        
                        <div className="register__box">
                            <input type='text' id='surname' ref={surnameRef} required/>
                            <label htmlFor='surname'>Nazwisko</label>
                            <p className="register__text-error" ref={surnameError}>error</p>
                        </div>
                    </div>

                    <div className="register__row">
                        <div className="register__box">
                            <input type='text' id='username' ref={usernameRef} required/>
                            <label htmlFor='username'>Nazwa użytkownika</label>
                            <p className="register__text-error" ref={usernameError}>error</p>
                        </div>

                        <div className="register__box">
                            <input type='text' id='email' ref={emailRef} required/>
                            <label htmlFor='email'>Adres email</label>
                            <p className="register__text-error" ref={emailError}>error</p>
                        </div>
                    </div>
                    
                    <div className="register__row">
                        <div className="register__box">
                            <input type='text' id='password' ref={passRef} required/>
                            <label htmlFor='password'>Hasło</label>
                            <p className="register__text-error" ref={passError}>error</p>
                        </div>

                        <div className="register__box">
                            <input type='text' id='repeat-password' ref={repeatPassRef} required/>
                            <label htmlFor='repeat-password'>Powtórz hasło</label>
                            <p className="register__text-error" ref={repeatPassError}>error</p>
                        </div>
                    </div>
                    <div className='register__btn-box'>
                        <button type='submit' onClick={handleSubmit} className='register__submit'>
                            Zarejestruj się
                        </button>
                    </div>
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