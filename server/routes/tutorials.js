import express from 'express';
import auth from "../middleware/auth.js";
import { createTutorial, getTutorialsByUsername, deleteTutorialById, getTutorialById, updateTutorial } from '../controllers/tutorials.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Tutorial:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Tytuł poradnika
 *         stages:
 *           type: array
 *           description: Etapy poradnika
 *         username:
 *           type: string
 *           description: Autor poradnika
 *       example:
 *         title: "string"
 *         stages: [{ id: 1, name: "string", desc: "string", selectedFile: [] }]
 *         usernmae: "string"
 */

/**
 * @swagger
 * tags:
 *   name: tutorials
 */

/**
 * @swagger
 * /tutorials/createTutorial:
 *   post:
 *     description: Tworzenie poradnika
 *     tags: [tutorials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tutorial'
 *     responses:
 *       201:
 *         description: Utworzono poradnik
 *       409:
 *         description: Nie utworzono poradnika konflikt
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.post("/createTutorial", auth, createTutorial);

/**
 * @swagger
 * /tutorials/getTutorialsByUsername/{username}:
 *   get:
 *     description: Pobieranie poradników użytkownika
 *     tags: [tutorials]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Pobrano poradniki użytkownika
 */

router.get("/getTutorialsByUsername/:username", getTutorialsByUsername);

/**
 * @swagger
 * /tutorials/deleteTutorial/{id}:
 *   delete:
 *     description: Usuwanie poradniki po jego id
 *     tags: [tutorials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Usunięto porandnik
 *       404:
 *         description: Nie znaleziono poradnika
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.delete("/deleteTutorial/:id", auth, deleteTutorialById);

/**
 * @swagger
 * /tutorials/getTutorialById/{id}:
 *   get:
 *     description: Pobieranie jednego poradnika po jego id
 *     tags: [tutorials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Pobrano poradnik
 *       404:
 *         description: Nie znaleziono poradnika 
 */

router.get("/getTutorialById/:id", getTutorialById);

/**
 * @swagger
 * /tutorials/updateTutorial/{id}:
 *   patch:
 *     description: Akutalizowanie poradnika
 *     tags: [tutorials]
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
 *             $ref: '#/components/schemas/Tutorial'
 *     responses:
 *       200:
 *         description: Zaktualizowano poradnik
 *       404:
 *         description: Nie znaleziono poradnika
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.patch("/updateTutorial/:id", auth, updateTutorial);

export default router;