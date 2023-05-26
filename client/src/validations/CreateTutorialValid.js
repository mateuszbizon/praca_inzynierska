export function checkTitle(title) {
    const errors = {}
    const titleLength = 100;

    if (title.length > titleLength ) {
        errors.title = `Tytuł nie może być dłuższy niż ${titleLength} znaków`
    }

    if (title.length == 0) {
        errors.title = "Tytuł nie może być pusty";
    }

    return errors;
}

export function checkStage(values) {
    const errors = {}
    const stageNameLength = 50;

    if (values.name.length > stageNameLength) {
        errors.name = `Nazwa etapu nie może być dłuższa niż ${stageNameLength} znaków`;
    }

    if (values.name.length == 0) {
        errors.name = "Nazwa etapu nie może być pusta";
    }

    if (values.desc.length == 0 ) {
        errors.desc = "Opis nie może być pusty";
    }

    if (!values.selectedFile.includes("data:image")) {
        errors.selectedFile = "Zły format pliku. Wybierz zdjęcie"
    }

    if (values.selectedFile.length == 0) {
        errors.selectedFile = "Wybierz plik";
    }

    return errors;
}