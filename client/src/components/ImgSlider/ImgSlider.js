import React, { useState } from "react";
import "./img-slider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function ImgSlider({ imgsArray }) {
	const [index, setIndex] = useState(0);

	function next() {
		if (index === imgsArray.length - 1) {
			setIndex(0);
		} else {
			setIndex(index + 1);
		}
	}

	function prev() {
		if (index === 0) {
			setIndex(imgsArray.length - 1);
		} else {
			setIndex(index - 1);
		}
	}

	return (
		<div className='img-slider'>
			<img
				src={imgsArray.length > 0 ? imgsArray[index].base64 : null}
				className='img-slider__img'
			/>
			<button
				className={
					imgsArray.length < 2
						? "img-slider__btn-not-show"
						: "img-slider__btn img-slider__btn-prev"
				}
				onClick={prev}>
				<FontAwesomeIcon className='img-slider__icon' icon={faChevronLeft} />
			</button>
			<button
				className={
					imgsArray.length < 2
						? "img-slider__btn-not-show"
						: "img-slider__btn img-slider__btn-next"
				}
				onClick={next}>
				<FontAwesomeIcon className='img-slider__icon' icon={faChevronRight} />
			</button>
		</div>
	);
}

export default ImgSlider;
