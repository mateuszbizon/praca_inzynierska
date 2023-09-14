import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Posts from "../../components/Posts/Posts";
import Tutorials from "../../components/Tutorials/Tutorials";
import "./profiles.css";
import { getPostsByUsername } from "../../actions/posts";
import { getTutorialsByUsername } from "../../actions/tutorials";
import { useDispatch } from "react-redux";
import UserData from "../../components/UserData/UserData";

function Profiles() {
	const { username } = useParams();
	const dispatch = useDispatch();
	const [shadowActive, setShadowActive] = useState(false);
	const [changeView, setChangeView] = useState("posts");
	const markerRef = useRef();

	function indicator(e) {
		markerRef.current.style.left = `${e.offsetLeft}px`;
		markerRef.current.style.width = `${e.offsetWidth}px`;
	}

	function changeViewAndMarker(e, viewToChange) {
		setChangeView(viewToChange);
		indicator(e.target);
	}

	useEffect(() => {
		dispatch(getPostsByUsername(username));
		dispatch(getTutorialsByUsername(username));
	}, [username]);

	return (
		<>
			<section className='profiles'>
				<div
					className={shadowActive ? "profiles__shadow-active" : "profiles__shadow"}
					onClick={() => setShadowActive(false)}></div>
				<UserData username={username} />
				<div className='profiles__main-buttons'>
					<button onClick={e => changeViewAndMarker(e, "posts")}>
						Posty
					</button>
					<button onClick={e => changeViewAndMarker(e, "tutorials")}>
						Poradniki
					</button>
					<div className='profiles__marker' ref={markerRef}></div>
				</div>
				{changeView === "posts" && <Posts shadowActive={shadowActive} setShadowActive={setShadowActive} />}
				{changeView === "tutorials" && <Tutorials shadowActive={shadowActive} setShadowActive={setShadowActive} />}
			</section>
		</>
	);
}

export default Profiles;
