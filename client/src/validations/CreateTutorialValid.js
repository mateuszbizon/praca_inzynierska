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

    if (values.selectedFile.length > 5) {
        errors.selectedFile = "Maksymalnie można dodać 5 zdjęć na etap";
    }

    for (const element of values.selectedFile) {
        if (!element.base64.includes("data:image")) {
            errors.selectedFile = "Zły format pliku. Wybierz zdjęcie/zdjęcia";
            break;
        }
    }

    if (values.selectedFile.length == 0) {
        errors.selectedFile = "Wybierz plik/pliki";
    }

    return errors;
}

export function checkTutorial(title, allStages) {
    if (title == "" || allStages.length == 0) {
        return false
    }

    return true
}