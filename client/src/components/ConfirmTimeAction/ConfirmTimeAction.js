import React, { useState, useRef, useEffect } from "react";
import "./confirmTimeAction.css";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteTime,
	setDnf,
	setTimeOk,
	setPlusTwo,
	deleteAllTimes,
} from "../../actions/times";
import { addNewSession } from "../../actions/sessions";
import { CircularProgress } from "@mui/material";
import sessionValid from "../../validations/SessionValid";
import * as deleteConfirmMessages from "../../constants/deleteConfirmMessages";

function ConfirmTimeAction({
	currentTimeId,
	currentTime,
	isShadowActive,
	setIsShadowActive,
	timeAction,
	times,
	bestTime,
}) {
	const [showDeleteTime, setShowDeleteTime] = useState(false);
	const [nameSession, setNameSession] = useState("");
	const [errors, setErrors] = useState({})
	const dispatch = useDispatch();
	const { isLoading } = useSelector(state => state.loaders);
	const { message, success } = useSelector(state => state.sessions);

	function handleCloseModal() {
		setIsShadowActive(false);
		setShowDeleteTime(false);
	}

	function handleDelete() {
		dispatch(deleteTime(currentTimeId));
		handleCloseModal();
	}

	function handleSetDnf() {
		dispatch(setDnf(currentTimeId));
		handleCloseModal();
	}

	function handleTimeOk() {
		dispatch(setTimeOk(currentTimeId));
		handleCloseModal();
	}

	function handlePlusTwoTime() {
		dispatch(setPlusTwo(currentTimeId));
		handleCloseModal();
	}

	function handleDeleteAllTimes() {
		dispatch(deleteAllTimes());
		handleCloseModal();
	}

	function handleSubmit(e) {
		e.preventDefault();

		setErrors(sessionValid(nameSession))
	}

	useEffect(() => {
		if (Object.keys(errors).length == 0 && nameSession !== "") {
			dispatch(addNewSession({ nameSession, times, bestTime }));
			setNameSession("");
		}
	}, [errors])

	return (
		<div
			className={
				!isShadowActive ? "confirm-time-action" : "confirm-time-action active"
			}>
			{timeAction === "delete-all-times" && (
				<>
					<p className='confirm-time-action__title'>
						{deleteConfirmMessages.deleteAllTimesMessage}
					</p>
					<div className='confirm-time-action__delete-buttons'>
						<button onClick={handleDeleteAllTimes}>Tak</button>
						<button onClick={handleCloseModal}>Nie</button>
					</div>
				</>
			)}
			{timeAction === "choose-time-action" && (
				<>
					<p className='confirm-time-action__title'>Czas nr. {currentTimeId}</p>
					<p className='confirm-time-action__time'>{currentTime}</p>
					<div className='confirm-time-action__main-buttons'>
						<button onClick={() => setShowDeleteTime(true)}>Usuń</button>
						<button onClick={handleSetDnf}>DNF</button>
						<button onClick={handlePlusTwoTime}>+2</button>
						<button onClick={handleTimeOk}>Czas OK</button>
					</div>
					{showDeleteTime && (
						<>
							<p className='confirm-time-action__delete-title'>
								{deleteConfirmMessages.deleteTimeMessage}
							</p>
							<div className='confirm-time-action__delete-buttons'>
								<button onClick={handleDelete}>Tak</button>
								<button onClick={() => setShowDeleteTime(false)}>Nie</button>
							</div>
						</>
					)}
					<div className='confirm-time-action__ok-btn-box'>
						<button onClick={handleCloseModal}>Zamknij</button>
					</div>
				</>
			)}
			{timeAction === "save-session" && (
				<>
					<div className='confirm-time-action__form-heading'>Zapisz czasy</div>
					<form onSubmit={handleSubmit} noValidate>
						<div className='confirm-time-action__form-box'>
							<input
								id='session-name'
								type='text'
								value={nameSession}
								onChange={e => setNameSession(e.target.value)}
								required
							/>
							<label htmlFor='session-name'>Nazwa sesji</label>
							<p
								className={errors.nameSession ? "confirm-time-action__text-error confirm-time-action__show-input-error" : "confirm-time-action__text-error"} >
								{errors.nameSession ? errors.nameSession : "error"}
							</p>
						</div>
						<div className='confirm-time-action__btn-box'>
							<button type='submit'>
								Zapisz{" "}
								{isLoading && (
									<CircularProgress size='25px' style={{ color: "#fff" }} />
								)}
							</button>
						</div>
						<div
							className={
								success
									? "confirm-time-action__submit-message success"
									: "confirm-time-action__submit-message"
							}>
							{message}
						</div>
					</form>
				</>
			)}
		</div>
	);
}

export default ConfirmTimeAction;
