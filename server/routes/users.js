import express from 'express';
import { signin, signup, getUser, getUsersBySearch, editAccount, editPassword } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Imię użytkownika
 *         surname:
 *           type: string
 *           description: Nazwisko użytkownika
 *         email:
 *           type: string
 *           description: Email użytkownika
 *         password:
 *           type: string
 *           description: Hasło użytkownika
 *         username:
 *           type: string
 *           description: Nazwa użytkownika
 *         selectedFile:
 *           type: string
 *           description: Zdjęcie profilowe użytkownika
 *         newPassword:
 *           type: string
 *           description: Nowe hasło użytkownika podczas zmiany hasła
 */

/**
 * @swagger
 * tags:
 *   name: users
 */

/**
 * @swagger
 * /user/signin:
 *   post:
 *     description: Logowanie
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Zalogowano
 *       404:
 *         description: Błędne dane logowania.
 *       400:
 *         description: Potwierdź rejestracje. Błędne dane logowania
 */

router.post("/signin", signin);

/**
 * @swagger
 * /user/signup:
 *   post:
 *     description: Rejestracja
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Zarejestrowano pomyślnie.
 *       400:
 *         description: Email jest już zajęty. Nazwa użytkownika jest już zajęta
 */

router.post("/signup", signup);

/**
 * @swagger
 * /user/getUser/{username}:
 *   get:
 *     description: Pobieranie profilu użytkownka po nazwie użytkownika
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: username
 *         description: nazwa użytkownika
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Jeden obiekt zawierający dane użytkownika
 *       404:
 *         description: Nie ma takiego użytkownika
 */

router.get("/getUser/:username", getUser);

/**
 * @swagger
 * /user/getUsersBySearch:
 *   get:
 *     description: Wyszukiwanie użytkowników
 *     tags: [users]
 *     parameters:
 *       - in: query
 *         name: search
 *         description: fraza wpisana przez użytkownika
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Tablica obiektów wyszukanych użytkowników
 */

router.get("/getUsersBySearch", getUsersBySearch);

/**
 * @swagger
 * /user/editAccount:
 *   patch:
 *     description: Edycja konta użytkownika bez hasła
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Zaktualizowano pomyślnie
 *       400:
 *         description: Nazwa użytkownika jest już zajęta
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.patch("/editAccount", auth, editAccount);

/**
 * @swagger
 * /user/editPassword/{id}:
 *   patch:
 *     description: Edycja hasła użytkownika
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id użytkownika
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Zmieniono hasło pomyślnie
 *       400:
 *         description: Nie można zmienić hasła innego użytkownika
 *       404:
 *         descritpion: Nie znaleziono użytkownika
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.patch("/editPassword/:id", auth, editPassword)

export default router;