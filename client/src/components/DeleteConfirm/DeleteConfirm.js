import React from "react";
import "./deleteConfirm.css";
import { useDispatch } from "react-redux";

function DeleteConfirm({
	shadowActive,
	setShadowActive,
	currentId,
	setCurrentId,
	deleteFunc,
	message
}) {
	const dispatch = useDispatch();

	function handleDelete() {
		dispatch(deleteFunc(currentId))
		setCurrentId(null);
		setShadowActive(false);
	}

	return (
		<div className={shadowActive ? "delete-confirm active" : "delete-confirm"}>
			<p className='delete-confirm__title'>
				{message}
			</p>
			<div className='delete-confirm__buttons'>
				<button onClick={handleDelete}>Tak</button>
				<button onClick={() => setShadowActive(false)}>Nie</button>
			</div>
		</div>
	);
}

export default DeleteConfirm;
