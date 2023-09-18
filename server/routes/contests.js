const express = require("express");
const auth = require("../middleware/auth.js");
const authAdmin = require("../middleware/authAdmin.js");
const { createContest, getAllContests, deleteContestById, getContestById, updateContest, addUserToContest, getContestEvent, addUserTimesToContestEvent, setContestEnded, setContestResumed } = require("../controllers/contests.js");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Contest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nazwa zawodów
 *         startRegistration:
 *           type: string
 *           description: Start rejestracji
 *         endRegistration:
 *           type: string
 *           description: Koniec rejestracji
 *         startContest:
 *           type: string
 *           description: Start zawodów
 *         endContest:
 *           type: string
 *           description: Koniec zawodów
 *         typeContest:
 *           type: string
 *           description: Typ zawodów
 *         city:
 *           type: string
 *           description: Miasto w którym odbywają się zawody stacjonarne
 *         place:
 *           type: string
 *           description: Dokładny adres odbywania się zawodów stacjonarnych
 *         events:
 *           type: array
 *           description: Konkurencję które odbędą się na zawodach
 *         usersLimit: 
 *           type: number
 *           description: Limit zawodników
 *       example:
 *         name: "string"
 *         startregistration: 2023-06-20T13:15:00.000+00:00
 *         endRegistration: 2023-06-20T13:15:00.000+00:00
 *         startContest: 2023-06-20T13:15:00.000+00:00
 *         endContest: 2023-06-20T13:15:00.000+00:00
 *         typeContest: "string"
 *         city: "string"
 *         place: "string"
 *         events: [{ value: "3x3x3", label: "Kostka 3x3x3" }]
 *     UserContest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email użytkownika
 *         place:
 *           type: string
 *           description: Miejscowość z której pochodzi zawodnik
 *         events:
 *           type: array
 *           description: Konkurencje w których użytkownik weźmie udział
 *       example:
 *         email: "string"
 *         place: "string"
 *         events: [{ value: "3x3x3", label: "Kostka 3x3x3" }]
 *     UserTimesEvent:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email użytkownika
 *         times:
 *           type: array
 *           description: Pomiary czasowe użytkownika
 *       example:
 *         email: "string"
 *         times: ["15.15", "15.15", "15.15", "15.14", "15.16"]
 */

/**
 * @swagger
 * tags:
 *   name: contests
 */

/**
 * @swagger
 * /contests/createContest:
 *   post:
 *     description: Dodawanie nowych zawodów
 *     tags: [contests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contest'
 *     responses:
 *       201:
 *         description: Dodano nowe zawody
 *       409:
 *         description: Nie dodano nowych zawodów konflikt
 *       401:
 *         description: Administrator nie zalogowany
 *       403:
 *         description: Użytkownik nie jest administratorem
 */

router.post("/createContest", auth, authAdmin, createContest);

/**
 * @swagger
 * /contests/getAllContests:
 *   get:
 *     description: Pobieranie wszystkich nadchodzących zawodów oraz wszystkich minionych zawodów
 *     tags: [contests]
 *     responses:
 *       200:
 *         description: Pobrano zawody
 */

router.get("/getAllContests", getAllContests);

/**
 * @swagger
 * /contests/deleteContestById/{id}:
 *   delete:
 *     description: Usuwanie zawodów po id
 *     tags: [contests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Usunięto zawody
 *       404:
 *         description: Nie znaleziono zawodów
 *       401:
 *         description: Administrator nie zalogowany
 *       403:
 *         description: Użytkownik nie jest administratorem
 */

router.delete("/deleteContestById/:id", auth, authAdmin, deleteContestById);

/**
 * @swagger
 * /contests/getContestById/{id}:
 *   get:
 *     description: Pobieranie zawodów po id
 *     tags: [contests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Pobrano zawody
 *       404:
 *         description: Nie znaleziono zawodów
 */

router.get("/getContestById/:id", getContestById);

/**
 * @swagger
 * /contests/updateContest/{id}:
 *   patch:
 *     decsription: Aktualizowanie zawodów
 *     tags: [contests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contest'
 *     responses:
 *       200:
 *         description: Zaktualizowano zawody
 *       404:
 *         description: Nie znaleziono zawodów
 *       401:
 *         description: Administrator nie zalogowany
 *       403:
 *         description: Użytkownik nie jest administratorem
 */

router.patch("/updateContest/:id", auth, authAdmin, updateContest);

/**
 * @swagger
 * /contests/setContestEnded/{id}:
 *   patch:
 *     description: Ustawianie zawodów jako zakończone
 *     tags: [contests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Zakończono zawody
 *       404:
 *         description: Nie znaleziono zawodów
 *       401:
 *         description: Administrator nie zalogowany
 *       403:
 *         description: Użytkownik nie jest administratorem
 */

router.patch("/setContestEnded/:id", auth, authAdmin, setContestEnded);

/**
 * @swagger
 * /contests/setContestResumed/{id}:
 *   patch:
 *     description: Ustawianie zawodów jako wznowione
 *     tags: [contests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Wznowiono zawody
 *       404:
 *         description: Nie znaleziono zawodów
 *       401:
 *         description: Administrator nie zalogowany
 *       403:
 *         description: Użytkownik nie jest administratorem
 */

router.patch("/setContestResumed/:id", auth, authAdmin, setContestResumed);

/**
 * @swagger
 * /contests/addUserToContest/{id}:
 *   patch:
 *     description: Dodawanie użytkownika do zawodów
 *     tags: [contests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserContest'
 *     responses:
 *       200:
 *         description: Dodano użytkownika do zawodów
 *       404:
 *         description: Nie znaleziono zawodów. Nie znaleziono użytkownika
 *       400:
 *         description: Użytkownik z tym emailem już zarejestrowany
 */

router.patch("/addUserToContest/:id", addUserToContest)

/**
 * @swagger
 * /contests/getContestEvent/{id}/{event}:
 *   get:
 *     description: Pobieranie danej konkurencji
 *     tags: [contests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *       - in: path
 *         name: event
 *         required: true
 *         type: string
 *     responses: 
 *       200:
 *         description: Pobrano konkurencję
 *       404:
 *         description: Nie znaleziono zawodów. Nie znaleziono konkurencji
 */

router.get("/getContestEvent/:id/:event", getContestEvent)

/**
 * @swagger
 * /contests/addUserTimesToContestEvent/{id}/{event}:
 *   patch:
 *     description: Dodawanie pomiarów czasowych użytkownika do konkurencji
 *     tags: [contests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *       - in: path
 *         name: event
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserTimesEvent'
 *     responses:
 *       200:
 *         description: Dodano pomiary czasowe użytkownika
 *       404:
 *         description: Nie znaleziono zawodów. Nie znaleziono konkurencji
 *       401:
 *         description: Administrator nie zalogowany
 *       403:
 *         description: Użytkownik nie jest administratorem
 */

router.patch("/addUserTimesToContestEvent/:id/:event", auth, authAdmin, addUserTimesToContestEvent)

module.exports =  router;