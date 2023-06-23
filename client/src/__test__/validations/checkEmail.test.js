import checkEmail from "../../validations/CheckEmail";

describe("Test email validate function", () => {
    test('email validation return false', () => { 
        const emailValue = "email.com"

        expect(checkEmail(emailValue)).toBe(false)
    })

    test('email validation return false', () => { 
        const emailValue = ""

        expect(checkEmail(emailValue)).toBe(false)
    })

    test('email validation return false', () => { 
        const emailValue = "email@value.com."

        expect(checkEmail(emailValue)).toBe(false)
     })

    test('email validation return true', () => { 
        const emailValue = "email@value.com"

        expect(checkEmail(emailValue)).toBe(true)
    })
})