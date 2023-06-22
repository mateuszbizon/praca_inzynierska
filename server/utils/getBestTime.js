function getBestTime(array) {
    let splitArray
    let newValue
    let bestTime = 1000000
    let bestTimeText = ""

    array.forEach(element => {
        newValue = element

        if (element === "DNF") return

        if (element.includes(":")) {
            splitArray = element.split(":")
            newValue = splitArray.join("")
        }

        if (parseFloat(newValue) < bestTime) {
            bestTime = parseFloat(newValue)
            bestTimeText = element
        }
    })

    return bestTimeText
}

module.exports = getBestTime;