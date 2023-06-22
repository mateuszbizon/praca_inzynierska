const User = require("../models/user.js");

function getBestTime(array) {
    let bestTime = 600000;
    let bestTimeText = '-';
	let helpArray;
	let joinArray;

	if(array.length === 0) return bestTimeText;

    for(let i=0; i<array.length; i++) {

		if(array[i].isDnf === true) continue;

		if(array[i].plusTwo === null) {
			if(array[i].time.includes(":")) {
				helpArray = array[i].time.split('.');
				joinArray = helpArray.join('');
	
				helpArray = joinArray.split(':');
				joinArray = helpArray.join('');
			} else {
				helpArray = array[i].time.split('.');
				joinArray = helpArray.join('');
			}
		} else {
			if(array[i].plusTwo.includes(":")) {
				helpArray = array[i].plusTwo.split('.');
				joinArray = helpArray.join('');
	
				helpArray = joinArray.split(':');
				joinArray = helpArray.join('');
			} else {
				helpArray = array[i].plusTwo.split('.');
				joinArray = helpArray.join('');
			}
		}

    
        if(parseInt(joinArray) < bestTime) {
          bestTime = parseInt(joinArray);
		  
		  if(array[i].plusTwo === null) {
			bestTimeText = array[i].time;
		  } else {
			bestTimeText = array[i].plusTwo;
		  }
        }
    }

    return bestTimeText;
}

function getPlusTwoTime(time) {
	let minutes = 0;
	let seconds = 0;
	let miliseconds = 0;

	if(time.time.includes(':')) {
		seconds = time.time.split(":").pop().split(".")[0];
		seconds = parseInt(seconds) + 2;

		minutes = time.time.split(":")[0];
		minutes = parseInt(minutes);

		if(seconds >= 60) {
			minutes++;
		}

		seconds = seconds % 60;
	} else {
		seconds = time.time.split(".")[0];
		seconds = parseInt(seconds) + 2;

		if(seconds >= 60) {
			minutes++;
		}

		seconds = seconds % 60;
	}

	miliseconds = time.time.split(".")[1];
	miliseconds = parseInt(miliseconds);

	if(minutes > 0) return `${minutes}:${seconds}.${miliseconds}`;

	return `${seconds}.${miliseconds}`;
}

const getAllTimes = async (req, res) => {
	try {
		const user = await User.findById(req.userId);

		const allTimes = user.times;

        const bestTime = getBestTime(user.times);

		res.status(200).json({ times: allTimes, bestTime: bestTime });
	} catch (error) {
		res.status(500).json({ message: "Błąd serwera. Spróbuj ponownie później.", desc: error.message });
	}
}

const addNewTime = async (req, res) => {
	const { time } = req.body;

	try {
		const user = await User.findById(req.userId);

		if (user.times.length === 0){
			user.times.push({ id: 1, time: time, isDnf: false, plusTwo: null, textToDisplay: time })
		} else {
			const lastTime = user.times[user.times.length - 1];

			user.times.push({ id: lastTime.id + 1, time: time, isDnf: false, plusTwo: null, textToDisplay: time });
		}

		const updatedTimes = await User.findByIdAndUpdate(req.userId, user, { new: true });

		const bestTime = getBestTime(updatedTimes.times);

		res.status(200).json({ message: "Dodano nowy czas", times: updatedTimes.times, bestTime: bestTime });
	} catch (error) {
		res.status(500).json({ message: "Błąd serwera. Spróbuj ponownie później.", desc: error.message });
	}
}

const deleteTime = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById(req.userId);

		const currentTimeIndex = user.times.indexOf(user.times.find(t => t.id === parseInt(id)))

		if (currentTimeIndex === -1) return res.status(404).json({ message: "Nie znaleziono czasu z tym id" })

		user.times = user.times.filter(t => t.id !== parseInt(id));

		const updatedTimes = await User.findByIdAndUpdate(req.userId, user, { new: true });

		const bestTime = getBestTime(updatedTimes.times);

		res.status(200).json({ message: "Usunięto czas", times: updatedTimes.times, bestTime: bestTime })
	} catch (error) {
		res.status(500).json({ message: "Błąd serwera. Spróbuj ponownie później.", desc: error.message });
	}
}

const deleteAllTimes = async (req, res) => {
	try {
		const user = await User.findById(req.userId);

		user.times = [];

		const updatedTimes = await User.findByIdAndUpdate(req.userId, user, { new: true });

		const bestTime = getBestTime(updatedTimes.times);

		res.status(200).json({ message: "Usunięto wszystkie czasy", times: updatedTimes.times, bestTime: bestTime })
	} catch (error) {
		res.status(500).json({ message: "Błąd serwera. Spróbuj ponownie później.", desc: error.message });
	}
}

const setDnf = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById(req.userId);

		const currentTime = user.times.find(t => t.id === parseInt(id));

		const currentTimeIndex = user.times.indexOf(currentTime);

		if (currentTimeIndex === -1) return res.status(404).json({ message: "Nie znaleziono czasu z tym id" })

		user.times[currentTimeIndex] = { id: currentTime.id, time: currentTime.time, isDnf: true, plusTwo: null, textToDisplay: `DNF(${currentTime.time})` }

		const updatedTimes = await User.findByIdAndUpdate(req.userId, user, { new: true });

		const bestTime = getBestTime(updatedTimes.times);

		res.status(200).json({ message: "Ustalono karę DNF", times: updatedTimes.times, bestTime: bestTime })
	} catch (error) {
		res.status(500).json({ message: "Błąd serwera. Spróbuj ponownie później.", desc: error.message });
	}
}

const setTimeOk = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById(req.userId);

		const currentTime = user.times.find(t => t.id === parseInt(id));

		const currentTimeIndex = user.times.indexOf(currentTime);

		if (currentTimeIndex === -1) return res.status(404).json({ message: "Nie znaleziono czasu z tym id" })

		user.times[currentTimeIndex] = { id: currentTime.id, time: currentTime.time, isDnf: false, plusTwo: null, textToDisplay: currentTime.time }

		const updatedTimes = await User.findByIdAndUpdate(req.userId, user, { new: true });

		const bestTime = getBestTime(updatedTimes.times);

		res.status(200).json({ message: "Ustalono czas na poprawny", times: updatedTimes.times, bestTime: bestTime })
	} catch (error) {
		res.status(500).json({ message: "Błąd serwera. Spróbuj ponownie później.", desc: error.message });
	}
}

const setPlusTwo = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById(req.userId);

		const currentTime = user.times.find(t => t.id === parseInt(id));

		const currentTimeIndex = user.times.indexOf(currentTime);

		if (currentTimeIndex === -1) return res.status(404).json({ message: "Nie znaleziono czasu z tym id" })

		const plusTwoTime = getPlusTwoTime(currentTime);

		user.times[currentTimeIndex] = { id: currentTime.id, time: currentTime.time, isDnf: false, plusTwo: plusTwoTime, textToDisplay: `${plusTwoTime}+` }

		const updatedTimes = await User.findByIdAndUpdate(req.userId, user, { new: true });

		const bestTime = getBestTime(updatedTimes.times);

		res.status(200).json({ message: "Ustalono karę dwóch sekund", times: updatedTimes.times, bestTime: bestTime })
	} catch (error) {
		res.status(500).json({ message: "Błąd serwera. Spróbuj ponownie później.", desc: error.message });
	}
}

module.exports = { setDnf, setPlusTwo, setTimeOk, getAllTimes, deleteAllTimes, deleteTime, addNewTime }