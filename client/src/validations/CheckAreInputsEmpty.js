export default function checkAreInputsEmpty(values) {
    for (const property in values) {
        if (values[property] === "") {
            return true
        }

        return false
    }
}