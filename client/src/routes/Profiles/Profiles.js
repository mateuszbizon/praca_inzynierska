import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Posts from "../../components/Posts/Posts";
import "./profiles.css";
import { getPostsByUsername } from "../../actions/posts";
import { useDispatch } from "react-redux";
import UserData from "../../components/UserData/UserData";
import DeleteConfirm from "../../components/DeleteConfirm/DeleteConfirm";

function Profiles() {
	const { username } = useParams();
	const dispatch = useDispatch();
	const [currentId, setCurrentId] = useState(false);

	useEffect(() => {
		dispatch(getPostsByUsername(username));
	}, [dispatch]);

	return (
		<>
			<DeleteConfirm />
			<section className='profiles'>
				<div
					className={currentId ? "profiles__shadow-active" : "profiles__shadow"}
					onClick={() => setCurrentId(false)}></div>
				<UserData username={username} />
				<Posts currentId={currentId} setCurrentId={setCurrentId} />
			</section>
		</>
	);
}

export default Profiles;
