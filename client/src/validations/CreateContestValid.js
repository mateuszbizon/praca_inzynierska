export default function createContestValid(values) {
    const errors = {}

    if (values.name === "") {
        errors.name = "Nazwa nie może być pusta"
    }

    if (Date.parse(values.startRegistration) >= Date.parse(values.endRegistration)) {
        errors.startRegistration = "Popraw datę względem konća rejestracji"
    }

    if (values.startRegistration === "") {
        errors.startRegistration = "Wpisz początek rejestracji"
    }

    if (values.endRegistration === "") {
        errors.endRegistration = "Wpisz koniec rejestracji"
    }

    if (values.startContest === "") {
        errors.startContest = "Wpisz początek zawodów"
    }

    if (Date.parse(values.startContest) >= Date.parse(values.endContest)) {
        errors.startContest = "Popraw datę względem konća zawodów"
    }

    if (values.endContest === "") {
        errors.endContest = "Wpisz koniec zawodów"
    }

    if (values.typeContest === "default") {
        errors.typeContest = "Wybierz typ zawodów"
    }

    if (values.typeContest === "stationary" && values.city === "") {
        errors.city = "Nazwa miasta nie może być pusta"
    }

    if (values.typeContest === "stationary" && values.place === "") {
        errors.place = "Miejsce wydarzenia nie może być puste"
    }

    return errors
}