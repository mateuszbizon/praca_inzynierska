function sortArrayBySurname(array) {
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

function sortArrayByAverage(array) {
    array.sort((a, b) => {
        if (a.average > b.average) {
            return 1
        }

        if (a.average < b.average) {
            return -1
        }

        if (a.average == 1000000 || b.average == 1000000) {
            if (a.surname > b.surname) {
                return 1
            }
    
            if (a.surname < b.surname) {
                return -1
            }
        }

        return 0
    })
}

module.exports = { sortArrayByAverage, sortArrayBySurname }