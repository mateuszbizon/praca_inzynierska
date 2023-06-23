import checkAreInputsEmpty from "../../validations/CheckAreInputsEmpty"

describe("Test inputs are empty validation function", () => {
    test('inputs are empty validation return true', () => {
        const valueObject = { value1: "", value2: "" }

        expect(checkAreInputsEmpty(valueObject)).toBe(true)
    })

    test('inputs are empty validation return true', () => {
        const valueObject = { value1: "", value2: "value" }

        expect(checkAreInputsEmpty(valueObject)).toBe(true)
    })

    test('inputs are empty validation return true', () => {
        const valueObject = { value1: "", value2: 15 }

        expect(checkAreInputsEmpty(valueObject)).toBe(true)
    })

    test('inputs are empty validation return true', () => {
        const valueObject = { value1: "", value2: [1, 2] }

        expect(checkAreInputsEmpty(valueObject)).toBe(true)
    })

    test('inputs are empty validation return false', () => {
        const valueObject = { value1: "value", value2: "value" }

        expect(checkAreInputsEmpty(valueObject)).toBe(false)
    })

    test('inputs are empty validation return true', () => {
        const valueObject = { value1: "value", value2: 15 }

        expect(checkAreInputsEmpty(valueObject)).toBe(false)
    })
})