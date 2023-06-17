export default function editPasswordValid(values) {
    const errors = {}
    
    if (values.newPassword !== values.repeatPassword) {
        errors.repeatPassword = "Hasła nie są takie same"
        errors.newPassword = "Hasła nie są takie same"
    }

    if (values.oldPassword === values.newPassword) {
        errors.newPassword = "Nowe hasło musi być inne niż stare hasło"
    }

    if (values.oldPassword === "") {
        errors.oldPassword = "Hasło nie może być puste"
    }

    if (values.newPassword === "") {
        errors.newPassword = "Hasło nie może być puste"
    }

    if (values.repeatPassword === "") {
        errors.repeatPassword = "Hasło nie może być puste"
    }

    return errors
}