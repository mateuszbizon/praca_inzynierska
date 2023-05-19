export default function sessionValid(value) {
    const errors = {}
    const nameSessionLength = 15

    if (value.length == 0) {
        errors.nameSession = "Nazwa sesji nie może być pusta"
    }

    if (value.length > nameSessionLength) {
        errors.nameSession = `Nazwa nie może być dłuższa niż ${nameSessionLength} znaków`
    }

    return errors
}