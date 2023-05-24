import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./more-create-options.css";

function MoreCreateOptions(props) {
    const navigate = useNavigate()

    const moreCreateOptionsItems = [
        {text: "Utwórz post", path: '/create-post'},
        {text: "Utwórz poradnik", path: '/create-tutorial'},
    ]

    function navigateTo(path) {
        navigate(path);
        props.setMoreCreateOptions(false)
    }

  return (
    <div className={props.moreCreateOptions ? "more-create-options active" : "more-create-options"}>
        {moreCreateOptionsItems.map((item, index) => (
            <div key={index} className="more-create-options__item" onClick={() => navigateTo(item.path)}>
                <p className="more-create-options__text">{item.text}</p>
            </div>
        ))}
    </div>
  )
}

export default MoreCreateOptions