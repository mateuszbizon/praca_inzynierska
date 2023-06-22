const request = require("supertest");
const app = require("../index");

let token = null

describe("POST /user/signin", () => {
    it("404 if email not found", () => {
        return request(app).post('/user/signin').send({
            email: "fake_email@wp.pl",
            password: "fake_password"
        }).expect(404)
    })

    it("400 if password is incorrect", () => {
        return request(app).post('/user/signin').send({
            email: "mat-biz@wp.pl",
            password: "fake_password"
        }).expect(400)
    })

    it("200 if email and password are correct", () => {
        return request(app).post("/user/signin").send({
            email: "mat-biz@wp.pl",
            password: "kaktus123"
        }).expect(200).then(response => {
            token = response.body.token
        })
    })
})

describe("POST /user/signup", () => {
    it("400 if email is already taken", () => {
        return request(app).post('/user/signup').send({
            email: "mat-biz@wp.pl",
            password: "fake_password",
            name: "Mateusz",
            surname: "Bizoń",
            username: "mateuszbizon"
        }).expect(400)
    })

    it("400 if username is already taken", () => {
        return request(app).post('/user/signup').send({
            email: "mati-biz@wp.pl",
            password: "fake_password",
            name: "Mateusz",
            surname: "Bizoń",
            username: "mateuszbizon"
        }).expect(400)
    })
})

describe("GET /user/getUser/:username", () => {
    it("404 if user was not found", () => {
        return request(app).get('/user/getUser/fake_username').expect(404)
    })
})

describe("PATCH /user/editAccount", () => {
    it("400 if username is already taken", () => {
        return request(app).patch('/user/editAccount').set('Authorization', 'Bearer ' + token).send({
            name: "Mateusz Bizoń",
            username: "mateuszbizon2",
            selectedFile: ""
        }).expect(400)
    })
})

describe("PATCH /user/editPassword/:id", () => {
    it("404 if user is not found", () => {
        return request(app).patch('/user/editPassword/fake_id').set('Authorization', 'Bearer ' + token).send({
            password: "haslo",
            newPassword: "haslo"
        }).expect(404)
    })

    it("400 if password is incorrect", () => {
        return request(app).patch('/user/editPassword/6492d306e1fa518521d8e453').set('Authorization', 'Bearer ' + token).send({
            password: "haslo",
            newPassword: "haslo123"
        }).expect(400)
    })

    it("400 if changing password is not logged user", () => {
        return request(app).patch('/user/editPassword/64946134330d9342d6adf2c8').set('Authorization', 'Bearer ' + token).send({
            password: "haslo",
            newPassword: "haslo123"
        }).expect(400)
    })
})
