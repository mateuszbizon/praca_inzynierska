import User from "../models/user.js";

function getBestTime(array) {
    let bestTime = 0;
    let bestTimeText = '-';

	if(array.length === 0) return bestTimeText;

    for(let i=0; i<array.length; i++) {

		if(array[i].isDnf === true) continue;

        let helpArray = array[i].time.split('.') || array[i].time.split(':');
        let joinArray = helpArray.join('');
    
        if(i === 0) {
          bestTime = parseInt(joinArray);
        }
    
        if(parseInt(joinArray) < bestTime) {
          bestTime = parseInt(joinArray);
          bestTimeText = array[i].time;
        }
    }

    return bestTimeText;
}

export const getAllTimes = async (req, res) => {
	try {
		const user = await User.findById(req.userId);

		const allTimes = user.times;

        const bestTime = getBestTime(user.times);

		res.status(200).json({ times: allTimes, bestTime: bestTime });
	} catch (error) {
		console.log(error)
	}
}

export const addNewTime = async (req, res) => {
	const { time } = req.body;

	try {
		const user = await User.findById(req.userId);

		if (user.times.length === 0){
			user.times.push({ id: 1, time: time, isDnf: false, isPlusTwo: false, textToDisplay: time })
		} else {
			const lastTime = user.times[user.times.length - 1];

			user.times.push({ id: lastTime.id + 1, time: time, isDnf: false, isPlusTwo: false, textToDisplay: time });
		}

		const updatedTimes = await User.findByIdAndUpdate(req.userId, user, { new: true });

		const bestTime = getBestTime(updatedTimes.times);

		res.status(200).json({ times: updatedTimes.times, bestTime: bestTime });
	} catch (error) {
		console.log(error)
	}
}

export const deleteTime = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById(req.userId);

		user.times = user.times.filter(t => t.id !== parseInt(id));

		const updatedTimes = await User.findByIdAndUpdate(req.userId, user, { new: true });

		const bestTime = getBestTime(updatedTimes.times);

		res.status(200).json({ times: updatedTimes.times, bestTime: bestTime })
	} catch (error) {
		console.log(error)
	}
}

export const setDnf = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById(req.userId);

		const currentTime = user.times.find(t => t.id === parseInt(id));

		const currentTimeIndex = user.times.indexOf(currentTime);

		user.times[currentTimeIndex] = { id: currentTime.id, time: currentTime.time, isDnf: true, isPlusTwo: false, textToDisplay: "DNF" }

		const updatedTimes = await User.findByIdAndUpdate(req.userId, user, { new: true });

		const bestTime = getBestTime(updatedTimes.times);

		res.status(200).json({ times: updatedTimes.times, bestTime: bestTime })
	} catch (error) {
		console.log(error)
	}
}