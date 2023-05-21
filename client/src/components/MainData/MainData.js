import React, { useState, useEffect, useRef } from "react";
import FileBase from "react-file-base64";
import userImg from "../../img/user.png";
import { useDispatch, useSelector } from "react-redux";
import { editAccount } from "../../actions/auth";
import { CircularProgress } from "@mui/material";
import './main-data.css'
import editMainDataValid from "../../validations/EditMainDataValid";

function MainData() {
	const [form, setForm] = useState({
		name: "",
		username: "",
		selectedFile: "",
	});
	const [errors, setErrors] = useState({})
	const user = JSON.parse(localStorage.getItem("user"));
	const dispatch = useDispatch();
	const { authData, error, success, loading } = useSelector(
		state => state.auth
	);

	useEffect(() => {
		setForm(user.result);
	}, []);

	function onChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();

		setErrors(editMainDataValid(form))
	}

	useEffect(() => {
		if (Object.keys(errors).length == 0 && form.name !== "" && form.username !== "") {
			dispatch(editAccount(form));
		}
	}, [errors])

	return (
		<>
			{!user ? (
				<div className='no-user'>Nie znaleziono danego użytkownika</div>
			) : (
				<form onSubmit={handleSubmit} noValidate>
					<p className='main-data__change-img'>Zmień zdjęcie profilowe</p>
					<div className='main-data__img-box'>
						<img
							src={
								user.result.selectedFile === ""
									? userImg
									: user.result.selectedFile
							}
							alt=''
						/>
						<FileBase
							type='file'
							multiple={false}
							onDone={({ base64 }) =>
								setForm({ ...form, selectedFile: base64 })
							}
						/>
					</div>
					<div className='main-data__box'>
						<input
							type='text'
							id='name'
							name='name'
							value={form.name}
							onChange={onChange}
							required
						/>
						<label htmlFor='name'>Imię i nazwisko</label>
						<p className={errors.name ? "main-data__text-error main-data__show-input-error" : "main-data__text-error"} >
							{errors.name ? errors.name : "error"}
						</p>
					</div>
					<div className='main-data__box'>
						<input
							type='text'
							id='username'
							name='username'
							value={form.username}
							onChange={onChange}
							required
						/>
						<label htmlFor='username'>Nazwa użytkownika</label>
						<p className={errors.username ? "main-data__text-error main-data__show-input-error" : "main-data__text-error"} >
						{errors.username ? errors.username : "error"}
						</p>
					</div>
					<div className='main-data__submit-btn'>
						<button type='submit'>
							Edytuj profil{" "}
							{loading && (
								<CircularProgress size='25px' style={{ color: "#fff" }} />
							)}
						</button>
					</div>
					<p
						className={
							success
								? "main-data__submit-message success"
								: "main-data__submit-message"
						}>
						{error ? authData : ""}
						{success ? authData : ""}
					</p>
				</form>
			)}
		</>
	);
}

export default MainData;
