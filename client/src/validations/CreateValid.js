export default function createValid(values) {
    const errors = {}

    if (values.message.length == 0) {
        errors.message = "Wiadomość nie może być pusta"
    }

    if (!values.selectedFile.includes("data:image")) {
        errors.selectedFile = "Zły format pliku. Wybierz zdjęcie"
    }

    if (values.selectedFile.length == 0) {
        errors.selectedFile = "Wybierz plik!"
    }

    return errors;
}