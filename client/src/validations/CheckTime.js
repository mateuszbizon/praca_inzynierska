export default function checkTime(time) {
    const timeRegex = /^(\d{1,2}:)?\d{1,2}\.\d{2}$/

    if (!time.match(timeRegex)) {
        return false
    }

    return true
}