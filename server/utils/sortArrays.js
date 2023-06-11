export function sortArrayBySurname(array) {
    array.sort((a, b) => {
        if (a.surname > b.surname) {
            return 1
        }

        if (a.surname < b.surname) {
            return -1
        }
        
        return 0
    })
}