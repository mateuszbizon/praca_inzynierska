import checkTime from "../../validations/CheckTime";

describe("Test time validation function", () => {
    test('time validation return false', () => { 
        const timeValue = ""

        expect(checkTime(timeValue)).toBe(false)
    })

    test('time validation return false', () => { 
        const timeValue = "15.155"

        expect(checkTime(timeValue)).toBe(false)
    })

    test('time validation return false', () => { 
        const timeValue = "15.15a"

        expect(checkTime(timeValue)).toBe(false)
    })

    test('time validation return false', () => { 
        const timeValue = "15.1"

        expect(checkTime(timeValue)).toBe(false)
    })

    test('time validation return false', () => { 
        const timeValue = ".15.15"

        expect(checkTime(timeValue)).toBe(false)
    })

    test('time validation return false', () => { 
        const timeValue = "11.15.15"

        expect(checkTime(timeValue)).toBe(false)
    })

    test('time validation return false', () => { 
        const timeValue = "111:15.15"

        expect(checkTime(timeValue)).toBe(false)
    })

    test('time validation return true', () => { 
        const timeValue = "15.15"

        expect(checkTime(timeValue)).toBe(true)
    })

    test('time validation return true', () => { 
        const timeValue = "15:15.15"

        expect(checkTime(timeValue)).toBe(true)
    })
})