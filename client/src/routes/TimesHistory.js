import React, { useState, useEffect } from 'react';
import "../sass/css/times-history.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from "react-redux";
import { getAllSessions } from '../actions/sessions';

function TimesHistory() {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const { sessions } = useSelector(state => state.sessions);
  console.log(sessions)
  // const data = [
  //   { name: "Sesja 1", date: "07.03.2023" },
  //   { name: "Sesja 2", date: "07.03.2023" }
  // ];

  useEffect(() => {
    console.log('tak')
    dispatch(getAllSessions());
  }, [])

  function toggle(index) {
    if(clicked === index) {
      return setClicked(false);
    }

    setClicked(index)
  }

  return (
    <section className='times-history'>
      <div className="times-history__accordion">
        {sessions.map((item, index) => (
          <div className="times-history__accordion-box" key={index}>
            <div className="times-history__accordion-header" onClick={() => toggle(index)}>{item.name} Utworzono: {item.date} {clicked === index ? <RemoveIcon fontSize='large' /> : <AddIcon fontSize='large'/>}</div>
            {clicked === index ? (
              <div className="times-history__accordion-body">
                <div className="times-history__best-time">
                  <span>Najlepszy czas: {item.bestTime}</span>
                </div>
                <div className="times-history__times">
                  <div className="times-history__time-box">
                    <div className="times-history__time-number">Lp.</div>
                    <div className="times-history__time">Czas</div>
                  </div>
                  {item.times.map((time, index_time) => (
                    <div className="times-history__time-box" key={index_time}>
                      <div className="times-history__time-number">{time.id}</div>
                      <div className="times-history__time">{time.textToDisplay}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}

export default TimesHistory