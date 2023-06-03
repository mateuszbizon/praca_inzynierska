import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../actions/users";
import "./user-data.css";
import userImg from "../../img/user.png";

function UserData({ username }) {
	const dispatch = useDispatch();
	const { users } = useSelector(state => state.users);
	const { posts } = useSelector(state => state.posts);
	const navigate = useNavigate();
	const currentUser = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		dispatch(getUser(username));
	}, [dispatch, posts]);

	return (
		<>
			<div className='user-data'>
				<div className='user-data__img-side'>
					<img
						src={
							users?.user?.selectedFile === ""
								? userImg
								: users?.user?.selectedFile
						}
						className='user-data__img'
					/>
				</div>
				<div className='user-data__main-side'>
					<p className='user-data__info'>{users?.user?.name}</p>
					<p className='user-data__info'>{users?.user?.username}</p>
					{currentUser.result.username === users?.user?.username && (
						<button
							className='user-data__edit-profile'
							onClick={() => navigate("/edit-account")}>
							Edytuj profil
						</button>
					)}
				</div>
			</div>
		</>
	);
}

export default UserData;
