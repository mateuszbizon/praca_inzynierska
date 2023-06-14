export default function deleteWorstAndBestTime(array, bestTime) {
    const newArray = [...array]
    let splitArray
    let newValue
    let worstTime
    let worstTimeText = ""

    const bestTimeIndex = newArray.indexOf(newArray.find(t => t === bestTime))
    newArray.splice(bestTimeIndex, 1)

    newArray.forEach((element, index) => {
        newValue = element

        if (element.includes(":")) {
            splitArray = element.split(":")
            newValue = splitArray.join("")
        }

        if (index == 0) {
            worstTime = parseFloat(newValue)
            worstTimeText = element
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