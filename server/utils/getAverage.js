function getAverage(array) {
    let splitArray
    let minutes = 0
    let restTime = 0
    let average = 0
    let averageText = ""

    if (array.some(t => t === "DNF")) {
        return { average: 1000000, averageText: "DNF" }
    }

    array.forEach(element => {
        restTime = element

        if (element.includes(":")) {
            splitArray = element.split(":")
            minutes = splitArray[0]
            restTime = splitArray[1]
        }

        average += parseFloat(minutes * 60) + parseFloat(restTime)
        minutes = 0
    })

    average = average / 3

    if (average < 60) {
        average = parseFloat(average.toFixed(2))
        averageText = average.toFixed(2)
    } else {
        average = parseFloat(average.toFixed(2))
        minutes = Math.floor(average / 60).toString()
        restTime = (average - (minutes * 60)).toFixed(2).toString()
        averageText = `${minutes}:${restTime}`
    }

    return { average: average, averageText: averageText }
}

module.exports = getAverage;