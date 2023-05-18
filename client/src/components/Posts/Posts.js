import React, { useState } from "react";
import Post from "../Post/Post";
import "./posts.css";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";

function posts({ currentId, setCurrentId }) {
	const { posts } = useSelector(state => state.posts);
	const { isLoading } = useSelector(state => state.loaders);
	const [currentPostId, setCurrentPostId] = useState(null);

	if (!posts.length && !isLoading) return "Brak postów";

	return (
		<>
			<DeleteConfirm
				currentId={currentId}
				setCurrentId={setCurrentId}
				currentPostId={currentPostId}
				setCurrentPostId={setCurrentPostId}
			/>
			{isLoading ? (
				<CircularProgress />
			) : (
				<div className='posts'>
					{posts.map(post => (
						<>
							<Post
								post={post}
								setCurrentId={setCurrentId}
								setCurrentPostId={setCurrentPostId}
							/>
						</>
					))}
				</div>
			)}
		</>
	);
}

export default posts;
