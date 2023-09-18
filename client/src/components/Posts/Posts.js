import React, { useState } from "react";
import Post from "../Post/Post";
import "./posts.css";
import { useSelector } from "react-redux";
import { deletePost } from "../../actions/posts";
import { CircularProgress } from "@mui/material";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
import * as deleteConfirmMessages from "../../constants/deleteConfirmMessages";

function posts({ shadowActive, setShadowActive }) {
	const { posts } = useSelector(state => state.posts);
	const { isLoading } = useSelector(state => state.loaders);
	const [currentId, setCurrentId] = useState(null);

	if (!posts.length && !isLoading) return (
		<div className="no-posts">
			Brak postów
		</div>
	);

	return (
		<>
			<DeleteConfirm
				shadowActive={shadowActive}
				setShadowActive={setShadowActive}
				currentId={currentId}
				setCurrentId={setCurrentId}
				deleteFunc={deletePost}
				message={deleteConfirmMessages.deletePostMessage}
			/>
			{isLoading ? (
				<CircularProgress />
			) : (
				<div className='posts'>
					{posts.map((post, index) => (
						<>
							<Post
								key={index}
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
