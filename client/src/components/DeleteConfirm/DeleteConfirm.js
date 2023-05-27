import React from "react";
import "./deleteConfirm.css";
import { useDispatch } from "react-redux";

function DeleteConfirm({
	shadowActive,
	setShadowActive,
	currentId,
	setCurrentId,
	deleteFunc
}) {
	const dispatch = useDispatch();

	function deleteCurrentPost() {
		dispatch(deleteFunc(currentId))
		setCurrentId(null);
		setShadowActive(false);
	}

	return (
		<div className={shadowActive ? "delete-confirm active" : "delete-confirm"}>
			<p className='delete-confirm__title'>
				Czy na pewno chcesz usunąć ten post?
			</p>
			<div className='delete-confirm__buttons'>
				<button onClick={deleteCurrentPost}>Tak</button>
				<button onClick={() => setShadowActive(false)}>Nie</button>
			</div>
		</div>
	);
}

export default DeleteConfirm;
