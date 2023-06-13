import checkTime from "./CheckTime"

export default function addUserTimeValid(values) {
    const errors = {}

    if (values.email === "") {
        errors.email = "Email nie może być pusty"
    }

    if (!checkTime(values.time1)) {
        errors.time1 = "Zły format!"
    }

    if (values.time1 === "") {
        errors.time1 = "Czas nie może być pusty"
    }

    if (!checkTime(values.time2)) {
        errors.time2 = "Zły format!"
    }

    if (values.time2 === "") {
        errors.time2 = "Czas nie może być pusty"
    }

    if (!checkTime(values.time3)) {
        errors.time3 = "Zły format!"
    }

    if (values.time3 === "") {
        errors.time3 = "Czas nie może być pusty"
    }

    if (!checkTime(values.time4)) {
        errors.time4 = "Zły format!"
    }

    if (values.time4 === "") {
        errors.time4 = "Czas nie może być pusty"
    }

    if (!checkTime(values.time5)) {
        errors.time5 = "Zły format!"
    }

    if (values.time5 === "") {
        errors.time5 = "Czas nie może być pusty"
    }

    return errors
}