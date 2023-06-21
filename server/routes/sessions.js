import express from "express";
import { addNewSession, getAllSessions, deleteSession } from "../controllers/sessions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Session:
 *       type: object
 *       properties:
 *         nameSession:
 *           type: string
 *           description: Nazwa sesji
 *         times:
 *           type: array
 *           description: Wszystkie pomiary czasowe uzyskane podczas jednej sesji
 *         bestTime:
 *           type: string
 *           description: Najlepszy pomiar czasowy
 */

/**
 * @swagger
 * tags:
 *   name: sessions
 */

/**
 * @swagger
 * /sessions/getAllSessions:
 *   get:
 *     description: Pobieranie wszystkich zapisanych sesji użytkownika
 *     tags: [sessions]
 *     responses:
 *       200:
 *         description: Pobrano wszystkie sesje użytkownika
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.get("/getAllSessions", auth, getAllSessions);

/**
 * @swagger
 * /sessions/addNewSession:
 *   post:
 *     description: Zapisywanie nowej sesji z pomiarami czasowymi
 *     tags: [sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Session'
 *     responses:
 *       200:
 *         description: Zapisano nową sesję
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.post("/addNewSession", auth, addNewSession);

/**
 * @swagger
 * /sessions/deleteSession/{id}:
 *   delete:
 *     description: Usuwanie sesji po jej id
 *     tags: [sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Usunięto sesję
 *       401:
 *         description: Użytkownik nie zalogowany
 *       404:
 *         description: Nie znaleziono sesji
 */

router.delete("/deleteSession/:id", auth, deleteSession);

export default router;