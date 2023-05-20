import React, { useState, useEffect } from "react";
import "./times-history.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { getAllSessions } from "../../actions/sessions";
import DeleteSessionConfirm from "../../components/DeleteSessionConfirm/DeleteSessionConfirm";
import { CircularProgress } from "@mui/material";

function TimesHistory() {
	const [clicked, setClicked] = useState(false);
	const [isShadowActive, setIsShadowActive] = useState(false)
	const [sessionId, setSessionId] = useState(null)
	const dispatch = useDispatch();
	const { sessions } = useSelector(state => state.sessions);
	const { isLoading } = useSelector(state => state.loaders)

	useEffect(() => {
		dispatch(getAllSessions());
	}, []);

	function toggle(index) {
		if (clicked === index) {
			return setClicked(false);
		}

		setClicked(index);
	}

	function chooseSessionToDelete(sessionId) {
		setIsShadowActive(true)
		setSessionId(sessionId)
	}

	if (sessions.length == 0 && !isLoading) {
		return (
			<section className="no-sessions">
				<div className="no-sessions__text">
					Nie dodano jeszcze sekcji
				</div>
			</section>
		);
	}

	return (
		<section className='times-history'>
			<div className={isShadowActive ? "times-history__shadow-active" : "times-history__shadow"} onClick={() => setIsShadowActive(false)}></div>
			<DeleteSessionConfirm isShadowActive={isShadowActive} setIsShadowActive={setIsShadowActive} sessionId={sessionId} />
			<div className='times-history__accordion'>
				{isLoading ? (
					<CircularProgress />
				) : (
					<>
						{sessions.map((item, index) => (
							<div className='times-history__accordion-box' key={index}>
								<div
									className='times-history__accordion-header'
									onClick={() => toggle(index)}>
									{item.name}, utworzono: {item.date}
									{clicked === index ? (
										<RemoveIcon fontSize='large' />
									) : (
										<AddIcon fontSize='large' />
									)}
								</div>
								{clicked === index ? (
									<div className='times-history__accordion-body'>
										<div className='times-history__best-time'>
											<span>Najlepszy czas: {item.bestTime}</span>
											<button className="times-history__delete-session-btn" onClick={() => chooseSessionToDelete(item.id)}>Usuń sesję</button>
										</div>
										<div className='times-history__times'>
											<div className='times-history__time-box'>
												<div className='times-history__time-number'>Lp.</div>
												<div className='times-history__time'>Czas</div>
											</div>
											{item.times.map((time, index_time) => (
												<div className='times-history__time-box' key={index_time}>
													<div className='times-history__time-number'>
														{time.id}
													</div>
													<div className='times-history__time'>
														{time.textToDisplay}
													</div>
												</div>
											))}
										</div>
									</div>
								) : null}
							</div>
						))}
					</>
				)}
			</div>
		</section>
	);
}

export default TimesHistory;
