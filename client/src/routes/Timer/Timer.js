import React, { useEffect, useRef, useState } from "react";
import "./timer.css";
import Times from "../../components/Times/Times";
import { useDispatch, useSelector } from "react-redux";
import { getAllTimes, addNewTime } from "../../actions/times";
import ConfirmTimeAction from "../../components/ConfirmTimeAction/ConfirmTimeAction";
import { useNavigate } from "react-router-dom";

function Timer() {
	const [isReadyForTiming, setIsReadyForTiming] = useState(false);
	const [isShadowActive, setIsShadowActive] = useState(false);
	const [currentTimeId, setCurrentTimeId] = useState(null);
	const [currentTime, setCurrentTime] = useState(null);
	const [timeAction, setTimeAction] = useState(null);
	const navigate = useNavigate();
	let interval;
	let time = 0;
	let ms = 0;
	let sec = 0;
	let min = 0;
	let isTiming = false;
	const milisecRef = useRef();
	const secRef = useRef();
	const minRef = useRef();
	const dotMinRef = useRef();
	const dispatch = useDispatch();
	const { times, bestTime } = useSelector(state => state.times);

	useEffect(() => {
		dispatch(getAllTimes());
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
	}, []);

	function handleKeyDown(e) {
		if (e.keyCode !== 32) return;
		if (!isTiming) {
			if (e.repeat) return;
			interval = setInterval(() => {
				time++;
				setIsReadyForTiming(true);
			}, 500);
		} else {
			clearInterval(interval);
			isTiming = false;
			setIsReadyForTiming(false);
			sendTime();
			ms = 0;
			sec = 0;
			min = 0;
		}
	}

	function handleKeyUp() {
		if (time < 1) {
			clearInterval(interval);
			time = 0;
			return;
		}
		clearInterval(interval);
		time = 0;
		isTiming = true;
		setIsReadyForTiming(false);
		startTimer();
	}

	function startTimer() {
		let start = Date.now();

		interval = setInterval(() => {
			ms = Math.floor((Date.now() - start) / 10)
			ms = ms < 10 ? "0" + ms : ms;

			if (ms > 100) {
				sec++;
				ms = "00";
				start = Date.now();
			}

			if (sec === 60) {
				min++;
				minRef.current.style.display = "block";
				dotMinRef.current.style.display = "block";
				sec = "0";
			}

			putValues();
		}, 10);
	}

	function putValues() {
		milisecRef.current.innerText = ms;
		secRef.current.innerText = sec;
		minRef.current.innerText = min;
	}

	function sendTime() {
		let newTime = "";

		if (min === 0) {
			newTime = `${sec}.${ms}`;
			dispatch(addNewTime({ time: newTime }));
			return;
		}

		newTime = `${min}:${sec}.${ms}`;
		dispatch(addNewTime({ time: newTime }));
	}

	function handleShowConfirmModal(timeActionText) {
		setTimeAction(timeActionText);
		setIsShadowActive(true);
	}

	return (
		<>
			<ConfirmTimeAction
				times={times}
				bestTime={bestTime}
				currentTimeId={currentTimeId}
				currentTime={currentTime}
				isShadowActive={isShadowActive}
				setIsShadowActive={setIsShadowActive}
				timeAction={timeAction}
			/>
			<section className='timer'>
				<div
					className={isShadowActive ? "timer__shadow-active" : "timer__shadow"}
					onClick={() => setIsShadowActive(false)}></div>
				<div
					className={
						!isReadyForTiming
							? "timer__container"
							: "timer__container ready-for-timing"
					}>
					<div className='timer__minutes' ref={minRef}>
						0
					</div>
					<div className='timer__dot-minutes' ref={dotMinRef}>
						:
					</div>
					<div className='timer__seconds' ref={secRef}>
						0
					</div>
					<div className='timer__dot-seconds'>.</div>
					<div className='timer__miliseconds' ref={milisecRef}>
						00
					</div>
				</div>
				<div className='timer__results'>
					<div className='timer__results-top'>
						<button onClick={() => handleShowConfirmModal("delete-all-times")}>
							Usuń
						</button>
						<button onClick={() => handleShowConfirmModal("save-session")}>
							Zapisz
						</button>
						<button onClick={() => navigate("/times-history")}>Historia</button>
						<p className='timer__results-best-time'>
							Najlepszy czas:
							<span> {bestTime}</span>
						</p>
					</div>
					<div className='timer__results-bottom'>
						<Times
							times={times}
							setCurrentTimeId={setCurrentTimeId}
							setCurrentTime={setCurrentTime}
							setIsShadowActive={setIsShadowActive}
							setTimeAction={setTimeAction}
						/>
					</div>
				</div>
			</section>
		</>
	);
}

export default Timer;
