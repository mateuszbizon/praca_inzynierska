import React, { useState, useRef } from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import CreateTutorial from "../../components/CreateTutorial/CreateTutorial";
import "./create.css";

function Create() {
    const [changeView, setChangeView] = useState("create-post");
    const markerRef = useRef();

    function indicator(e) {
		markerRef.current.style.left = `${e.offsetLeft}px`;
		markerRef.current.style.width = `${e.offsetWidth}px`;
	}

	function changeViewAndMarker(e, viewToChange) {
		setChangeView(viewToChange);
		indicator(e.target);
	}

	return (
		<>
			<section className='create'>
				<div className='create__container'>
                    <div className='create__main-buttons'>
                        <button onClick={e => changeViewAndMarker(e, "create-post")}>
                            Utwórz post
                        </button>
                        <button onClick={e => changeViewAndMarker(e, "create-tutorial")}>
                            Utwórz poradnik
                        </button>
                        <div className='create__marker' ref={markerRef}></div>
                    </div>
                   {changeView === "create-post" && <CreatePost />} 
                   {changeView === "create-tutorial" && <CreateTutorial />} 
				</div>
			</section>
		</>
	);
}

export default Create;
