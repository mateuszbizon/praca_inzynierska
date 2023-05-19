export default function registerValid(values) {
    const errors = {}
    const emailRegex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordLength = 7;

    if (values.email.length === 0) {
        errors.email = "Email nie może być pusty"
    }

    if (!values.email.match(emailRegex)) {
        errors.email = "Nieprawidłowy email"
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