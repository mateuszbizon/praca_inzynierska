export default function getBestTime(array) {
    let splitArray
    let newValue
    let bestTime
    let bestTimeText = ""

    array.forEach((element, index) => {
        newValue = element

        if (element.includes(":")) {
            splitArray = element.split(":")
            newValue = splitArray.join("")
        }

        if (index == 0) {
            bestTime = parseFloat(newValue)
            bestTimeText = element
        }

        if (parseFloat(newValue) < bestTime) {
            bestTime = parseFloat(newValue)
            bestTimeText = element
        }
    })

    return bestTimeText
}