import React from 'react';

function Times({ sessions, session }) {
    const currentSession = sessions.find(s => s.id === session.session);
  return (
    <>
        <div className="timer__results-time-box">
            <div className="timer__results-time-number">Lp.</div>
            <div className="timer__results-time">Czas</div>
        </div>
        {currentSession?.times.slice(0).reverse().map((t, i, a) => (
            <div key={i} className="timer__results-time-box">
                <div className="timer__results-time-number">{a.length - i}</div>
                <div className="timer__results-time">{t}</div>
            </div>
        ))}
    </>
  )
}

export default Times