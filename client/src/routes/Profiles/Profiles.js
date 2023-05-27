import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Posts from "../../components/Posts/Posts";
import "./profiles.css";
import { getPostsByUsername } from "../../actions/posts";
import { useDispatch } from "react-redux";
import UserData from "../../components/UserData/UserData";

function Profiles() {
	const { username } = useParams();
	const dispatch = useDispatch();
	const [shadowActive, setShadowActive] = useState(false);

	useEffect(() => {
		dispatch(getPostsByUsername(username));
	}, [dispatch]);

	return (
		<>
			<section className='profiles'>
				<div
					className={shadowActive ? "profiles__shadow-active" : "profiles__shadow"}
					onClick={() => setShadowActive(false)}></div>
				<UserData username={username} />
				<Posts shadowActive={shadowActive} setShadowActive={setShadowActive} />
			</section>
		</>
	);
}

export default Profiles;
