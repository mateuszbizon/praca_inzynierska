import React, { useState, useRef } from "react";
import "./editAccount.css";
import MainData from "../../components/MainData/MainData";
import Password from "../../components/Password/Password";
import Marker from "../../components/Marker/Marker";

function EditAccount() {
	const [changeView, setChangeView] = useState("no-password");
	const [indicator, setIndicator] = useState(null)
	const markerRef = useRef();
	const firstButtonRef = useRef()

	function changeViewAndMarker(e, viewToChange) {
		setChangeView(viewToChange);
		setIndicator(e.target)
	}

	return (
		<section className='edit-account'>
			<div className='edit-account__container'>
				<div className='edit-account__main-buttons'>
					<button ref={firstButtonRef} onClick={e => changeViewAndMarker(e, "no-password")}>
						Edytuj Profil
					</button>
					<button onClick={e => changeViewAndMarker(e, "password")}>
						Zmień hasło
					</button>
					<Marker firstButtonRef={firstButtonRef} indicator={indicator} />
				</div>
				{changeView === "no-password" && <MainData />}
				{changeView === "password" && <Password />}
			</div>
		</section>
	);
}

export default EditAccount;
