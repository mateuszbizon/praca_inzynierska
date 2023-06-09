import checkEmail from "./CheckEmail";

export default function registerValid(values) {
    const errors = {}
    const passwordLength = 7;

    if (!checkEmail(values.email)) {
        errors.email = "Nieprawidłowy email"
    }

    if (values.email.length === 0) {
        errors.email = "Email nie może być pusty"
    }

    if (values.password.length === 0) {
        errors.password = "Hasło nie może być puste"
    }

    if (values.password.length < passwordLength) {
        errors.password = `Hasło musi zawierać co najmniej ${passwordLength} znaków`
    }

    if (values.name.length === 0 ) {
        errors.name = "Imię nie może być puste"
    }

    if (values.surname.length === 0 ) {
        errors.surname = "Nazwisko nie może być puste"
    }

    if (values.username.length === 0 ) {
        errors.username = "Nazwa użytkownika nie może być pusta"
    }

    return errors
}