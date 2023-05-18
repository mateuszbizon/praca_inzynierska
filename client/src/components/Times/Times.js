import React from 'react';
import './times.css';

function Times({ times, setCurrentTimeId, setCurrentTime, setIsShadowActive, setTimeAction }) {
  function handleClickTime(id, time) {
    setCurrentTimeId(id);
    setCurrentTime(time)
    setIsShadowActive(true);
    setTimeAction("choose-time-action");
  }

  return (
    <>
        <div className="times__results-time-box">
            <div className="times__results-time-number">Lp.</div>
            <div className="times__results-time">Czas</div>
        </div>
        {times.slice(0).reverse().map((t, i) => (
          <div key={i} className="times__results-time-box">
            <div className="times__results-time-number">{t.id}</div>
            <div className="times__results-time" onClick={() => handleClickTime(t.id, t.textToDisplay)}>{t.textToDisplay}</div>
          </div>
        ))}
    </>
  )
}

export default Times