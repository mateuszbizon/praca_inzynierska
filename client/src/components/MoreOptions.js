import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MoreOptions({theme, setTheme, moreOptions, setMoreOptions}) {
    const navigate = useNavigate();

    const moreOptionsItems = [
        {text: "Czat", path: '/'},
        {text: "Nauka", path: '/'},
        {text: "Trening", path: '/'},
        {text: "Zawody", path: '/'},
    ]

    function toggleTheme() {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
        const darkMode = { value: theme }
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }

    function navigateTo(path) {
        navigate(path);
        setMoreOptions(false);
    }

  return (
    <div className={moreOptions ? "more-options active" : "more-options"}>
        <div className="more-options__item" onClick={toggleTheme}>
            <p className="more-options__text">Zmień wygląd</p>
        </div>
        {moreOptionsItems.map((item, index) => (
            <div key={index} className="more-options__item" onClick={() => navigateTo(item.path)}>
                <p className="more-options__text">{item.text}</p>
            </div>
        ))}
    </div>
  )
}

export default MoreOptions