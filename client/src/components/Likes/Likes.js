import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likePost } from "../../actions/posts";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import "./likes.css";

function Likes({ posts }) {
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("user"));
	const [likes, setLikes] = useState(posts.likes);
	const hasLikedPost = posts.likes?.find(like => like === user?.result?._id);

	function likeCurrentPost() {
		dispatch(likePost(posts._id));

		if (hasLikedPost) {
			setLikes(posts.likes.filter(id => id !== user?.result?._id));
		} else {
			setLikes([...posts.likes, user?.result?._id]);
		}
	}
	return (
		<>
			{likes?.find(like => like === user?.result?._id) ? (
				<ThumbUpIcon
					className='likes__icons'
					onClick={likeCurrentPost}
				/>
			) : (
				<ThumbUpOffAltIcon
					className='likes__icons'
					onClick={likeCurrentPost}
				/>
			)}
			<p className='likes__text'>Polub</p>
			<div className='likes__likes-count'>Polubień: {likes?.length}</div>
		</>
	);
}

export default Likes;
