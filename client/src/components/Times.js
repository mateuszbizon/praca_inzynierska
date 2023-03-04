import React from 'react';

function Times({ times, setCurrentTimeId, setCurrentTime, setIsShadowActive }) {
  function handleClickTime(id, time) {
    setCurrentTimeId(id);
    setCurrentTime(time)
    setIsShadowActive(true);
  }

  return (
    <>
        <div className="timer__results-time-box">
            <div className="timer__results-time-number">Lp.</div>
            <div className="timer__results-time">Czas</div>
        </div>
        {times.slice(0).reverse().map((t, i) => (
          <div key={i} className="timer__results-time-box">
            <div className="timer__results-time-number">{t.id}</div>
            <div className="timer__results-time" onClick={() => handleClickTime(t.id, t.textToDisplay)}>{t.textToDisplay}</div>
          </div>
        ))}
    </>
  )
}

export default Times