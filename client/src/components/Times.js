import React from 'react';

function Times({ sessions, session }) {
    const currentSession = sessions.find(s => s.id === session.session);
  return (
    <>
        <div className="timer__results-time-box">
            <div className="timer__results-time-number">Lp.</div>
            <div className="timer__results-time">Czas</div>
        </div>
        {currentSession?.times.map((t, i) => (
            <div key={i} className="timer__results-time-box">
                <div className="timer__results-time-number">{i + 1}</div>
                <div className="timer__results-time">{t}</div>
            </div>
        ))}
    </>
  )
}

export default Times