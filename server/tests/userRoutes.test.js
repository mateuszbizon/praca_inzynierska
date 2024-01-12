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
        }).expect(200)
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