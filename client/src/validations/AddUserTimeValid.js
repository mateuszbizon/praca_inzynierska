import checkTime from "./CheckTime"

export default function addUserTimeValid(values, contestEvent) {
    const errors = {}

    if (!contestEvent.users.some(u => u.email === values.email)) {
        errors.email = "Nie znaleziono podanego adresu w tej konkurencji"
    }

    if (values.email === "") {
        errors.email = "Email nie może być pusty"
    }

    if (!checkTime(values.time1) && values.time1 !== "DNF") {
        errors.time1 = "Zły format!"
    }

    if (values.time1 === "") {
        errors.time1 = "Czas nie może być pusty"
    }

    if (!checkTime(values.time2) && values.time1 !== "DNF") {
        errors.time2 = "Zły format!"
    }

    if (values.time2 === "") {
        errors.time2 = "Czas nie może być pusty"
    }

    if (!checkTime(values.time3) && values.time1 !== "DNF") {
        errors.time3 = "Zły format!"
    }

    if (values.time3 === "") {
        errors.time3 = "Czas nie może być pusty"
    }

    if (!checkTime(values.time4) && values.time1 !== "DNF") {
        errors.time4 = "Zły format!"
    }

    if (values.time4 === "") {
        errors.time4 = "Czas nie może być pusty"
    }

    if (!checkTime(values.time5) && values.time1 !== "DNF") {
        errors.time5 = "Zły format!"
    }

    if (values.time5 === "") {
        errors.time5 = "Czas nie może być pusty"
    }

    return errors
}