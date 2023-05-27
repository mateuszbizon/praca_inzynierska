import React, { useState } from "react";
import Post from "../Post/Post";
import "./posts.css";
import { useSelector } from "react-redux";
import { deletePost } from "../../actions/posts";
import { CircularProgress } from "@mui/material";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";

function posts({ shadowActive, setShadowActive }) {
	const { posts } = useSelector(state => state.posts);
	const { isLoading } = useSelector(state => state.loaders);
	const [currentId, setCurrentId] = useState(null);

	if (!posts.length && !isLoading) return "Brak postów";

	return (
		<>
			<DeleteConfirm
				shadowActive={shadowActive}
				setShadowActive={setShadowActive}
				currentId={currentId}
				setCurrentId={setCurrentId}
				deleteFunc={deletePost}
			/>
			{isLoading ? (
				<CircularProgress />
			) : (
				<div className='posts'>
					{posts.map(post => (
						<>
							<Post
								post={post}
								setShadowActive={setShadowActive}
								setCurrentId={setCurrentId}
							/>
						</>
					))}
				</div>
			)}
		</>
	);
}

export default posts;
