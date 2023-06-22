function deleteWorstAndBestTime(array, bestTime) {
    const newArray = [...array]
    let splitArray
    let newValue
    let worstTime = 0
    let worstTimeText = ""

    const bestTimeIndex = newArray.indexOf(newArray.find(t => t === bestTime))
    newArray.splice(bestTimeIndex, 1)

    newArray.forEach(element => {
        newValue = element

        if (element === "DNF") {
            worstTimeText = "DNF"
            worstTime = 1000000
        }

        if (element.includes(":")) {
            splitArray = element.split(":")
            newValue = splitArray.join("")
        }

        if (parseFloat(newValue) > worstTime) {
            worstTime = parseFloat(newValue)
            worstTimeText = element
        }
    })

    const worstTimeIndex = newArray.indexOf(newArray.find(t => t === worstTimeText))
    newArray.splice(worstTimeIndex, 1)

    return newArray
}

module.exports = deleteWorstAndBestTime;