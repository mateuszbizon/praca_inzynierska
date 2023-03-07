import React, { useState } from 'react';
import "../sass/css/times-history.css";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';

function TimesHistory() {
  const [clicked, setClicked] = useState(false);
  const data = [
    { name: "Sesja 1", date: "07.03.2023" },
    { name: "Sesja 2", date: "07.03.2023" }
  ];

  function toggle(index) {
    if(clicked === index) {
      return setClicked(false);
    }

    setClicked(index)
  }

  return (
    <section className='times-history'>
      <div className="times-history__accordion">
        {data.map((item, index) => (
          <div className="times-history__accordion-box" key={index}>
            <div className="times-history__accordion-header" onClick={() => toggle(index)}>{item.name} Utworzono: {item.date} {clicked === index ? <CloseIcon fontSize='large' /> : <AddIcon fontSize='large'/>}</div>
            {clicked === index ? (
              <div className="times-history__accordion-body">
                <div className="times-history__best-time">
                  <span>Najlepszy czas: 12.07</span>
                </div>
                <div className="times-history__times">
                  <div className="times-history__time-box">
                    <div className="times-history__time-number">Lp.</div>
                    <div className="times-history__time">Czas</div>
                  </div>
                  <div className="times-history__time-box">
                    <div className="times-history__time-number">1</div>
                    <div className="times-history__time">17.17</div>
                  </div>
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