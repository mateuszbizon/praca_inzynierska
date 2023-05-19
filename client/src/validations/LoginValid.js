export default function loginValid(values) {
    const errors = {}
    
    if (values.email.length === 0) {
        errors.email = "Email nie może być pusty";
    }

    if (values.password.length === 0) {
        errors.password = "Hasło nie może być puste";
    }

    return errors;
}