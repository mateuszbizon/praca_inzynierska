export default function createTutorialValid(values) {
    const errors = {}
    const titleLength = 50;

    if (values.title.length > titleLength ) {
        errors.title = `Tytuł nie może być dłuższy niż ${titleLength} znaków`
    }

    if (values.title.length == 0) {
        errors.title = "Tytuł nie może być pusty";
    }

    if (values.description.length == 0) {
        errors.description = "Opis nie może być pusty";
    }

    if (!values.selectedFile.includes("data:video")) {
        errors.selectedFile = "Zły format pliku. Wybierz film";
    }

    if (values.selectedFile.length == 0) {
        errors.selectedFile = "Wybierz plik!";
    }

    return errors;
}