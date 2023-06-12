import React from "react";
import "./live-results-info.css"

function LiveResultsInfo({ contest }) {
	return (
		<div className='live-results-info'>
			<p className='live-results-info__text'>
				Wszyscy uczestnicy zawodów oraz widzowie mogą śledzić wyniki wszystkich
				konkurencji na naszej podstronie. Kliknij{" "}
				<a
                    className="live-results-info__link"
					href={`/live-results/${contest._id}/${contest.events[0].value}`}
					target='_blank'>
					tutaj
				</a>{" "}
				aby przejść.
			</p>
		</div>
	);
}

export default LiveResultsInfo;
