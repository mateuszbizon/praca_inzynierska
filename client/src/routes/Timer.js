import React, { useEffect, useRef, useState } from 'react';
import '../sass/css/timer.css';
import Times from '../components/Times';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTimes, addNewTime } from '../actions/times';

function Timer() {
    const [isReadyForTiming, setIsReadyForTiming] = useState(false);
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
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp)
    }, [])

    function handleKeyDown(e) {
        if(!isTiming){
            if (e.repeat) return;
            interval = setInterval(() => {
                time++;
                setIsReadyForTiming(true);
            }, 500)
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
        if(time < 1){
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
        interval = setInterval(() => {
            ms++;
            ms = ms < 10 ? "0" + ms : ms;

            if(ms === 100){
                sec++;
                ms = "00";
            }

            if(sec === 60){
                min++;
                minRef.current.style.display = "block";
                dotMinRef.current.style.display = "block";
                sec = "0";
            }

            putValues();
        }, 10)
    }

    function putValues() {
        milisecRef.current.innerText = ms;
        secRef.current.innerText = sec;
        minRef.current.innerText = min;
    }

    function sendTime(){
        let newTime = '';

        if(min === 0){
            newTime = `${sec}.${ms}`;
            dispatch(addNewTime({ time: newTime }));
            return;
        }
        
        newTime = `${min}:${sec}.${ms}`;
        dispatch(addNewTime({ time: newTime }));
    }

  return (
    <section className='timer'>
        <div className={!isReadyForTiming ? "timer__container" : "timer__container ready-for-timing"}>
            <div className="timer__minutes" ref={minRef}>0</div>
            <div className="timer__dot-minutes" ref={dotMinRef}>.</div>
            <div className="timer__seconds" ref={secRef}>0</div>
            <div className="timer__dot-seconds">.</div>
            <div className="timer__miliseconds" ref={milisecRef}>00</div>
        </div>
        <div className="timer__results">
            <div className="timer__results-top">         
                <p className="timer__results-best-time">
                    Najlepszy czas:
                    <span> {bestTime}</span>
                </p>
            </div>
            <div className="timer__results-bottom">
                <Times times={times}/>
            </div>
        </div>
    </section>
  )
}

export default Timer