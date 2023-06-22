const express = require('express');
const { getAllTimes, addNewTime, deleteTime, setDnf, setTimeOk, setPlusTwo, deleteAllTimes } = require("../controllers/times.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Time:
 *       type: object
 *       properties:
 *         time:
 *           type: string
 *           description: Pomiar czasowy
 */

/**
 * @swagger
 * tags:
 *   name: times
 */

/**
 * @swagger
 * /times/getAllTimes:
 *   get:
 *     description: Pobieranie wszystkich pomiarów czasowych użytkownika wraz z najlepszym czasem
 *     tags: [times]
 *     responses:
 *       200:
 *         description: Pobrano wszystkie pomiary czasowe
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.get("/getAllTimes", auth, getAllTimes);

/**
 * @swagger
 * /times/addNewTime:
 *   post:
 *     description: Dodawanie nowego pomiaru czasowego
 *     tags: [times]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Time'
 *     responses:
 *       200:
 *         description: Dodano nowy pomiar czasowy
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.post("/addNewTime", auth, addNewTime);

/**
 * @swagger
 * /times/deleteTime/{id}:
 *   delete:
 *     description: Usuwanie pomiaru czasowego po jego id
 *     tags: [times]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Usunięto pomiar czasowy
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.delete("/deleteTime/:id", auth, deleteTime);

/**
 * @swagger
 * /times/deleteAllTimes:
 *   delete:
 *     description: Usuwanie wszystkich pomiarów czasowych
 *     tags: [times]
 *     responses:
 *       200:
 *         description: Usunięto wszystkie pomiary czasowe
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.delete("/deleteAllTimes", auth, deleteAllTimes);

/**
 * @swagger
 * /times/setDnf/{id}:
 *   patch:
 *     description: Dodawanie do pomiaru czasowego kary DNF
 *     tags: [times]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Dodano karę DNF
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.patch("/setDnf/:id", auth, setDnf);

/**
 * @swagger
 * /times/setTimeOk/{id}:
 *   patch:
 *     description: Ustawianie pomiaru czasowego na poprawny
 *     tags: [times]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Ustawiono pomiar czasowy na poprawny
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.patch("/setTimeOk/:id", auth, setTimeOk);

/**
 * @swagger
 * /times/setPlusTwo/{id}:
 *   patch:
 *     description: Dodawanie do pomiaru czasowgo kary dwóch sekund
 *     tags: [times]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Dodano karę dwóch sekund
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.patch("/setPlusTwo/:id", auth, setPlusTwo);

module.exports =  router;