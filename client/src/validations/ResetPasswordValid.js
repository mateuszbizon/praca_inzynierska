export default function resetPasswordValid(values) {
    const errors = {}

    if (values.email === "") {
        errors.email = "Email nie może być pusty";
    }

    return errors;
}