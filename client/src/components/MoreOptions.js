import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MoreOptions({moreOptions, setMoreOptions}) {
    const navigate = useNavigate();

    const moreOptionsItems = [
        {text: "Czat", path: '/'},
        {text: "Nauka", path: '/'},
        {text: "Trening", path: '/'},
        {text: "Zawody", path: '/'},
    ]

    function navigateTo(path) {
        navigate(path);
        setMoreOptions(false);
    }

  return (
    <div className={moreOptions ? "more-options active" : "more-options"}>
        {moreOptionsItems.map((item, index) => (
            <div key={index} className="more-options__item" onClick={() => navigateTo(item.path)}>
                <p className="more-options__text">{item.text}</p>
            </div>
        ))}
    </div>
  )
}

export default MoreOptions