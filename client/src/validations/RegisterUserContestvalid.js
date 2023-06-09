import checkEmail from "./CheckEmail";

export default function registerUserContestValid(values) {
    const errors = {}

    if (!checkEmail(values.email)) {
        errors.email = "Nieprawidłowy email"
    }

    if (values.email.length == 0 ) {
        errors.email = "email nie może być pusty"
    }

    if (values.name.length == 0) {
        errors.name = "Imię nie może być puste"
    }

    if (values.surname.length == 0) {
        errors.surname = "Nazwisko nie może być puste"
    }

    if (values.place.length == 0) {
        errors.place = "Miejscowość nie może być pusta"
    }

    if (values.events.length == 0) {
        errors.events = "Wybierz minimum jedną konkurencję"
    }

    return errors
}