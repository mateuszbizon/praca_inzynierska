export default function editMainDataValid(values) {
    const errors = {}

    if (values.name.length == 0) {
        errors.name = "Pole nie może być puste";
    }

    if (values.username.length == 0) {
        errors.username = "Nazwa użytkownika nie może być pusta";
    }

    return errors;
}