const express = require("express");
const { getPostsByUsername, getPostById, createPost, updatePost, deletePost, likePost, commentPost } = require("../controllers/posts.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Wiadomość postu
 *         selectedFile:
 *           type: string
 *           description: Zdjęcie postu
 *         username:
 *           type: string
 *           description: Autor postu 
 *     Comment:
 *       type: object
 *       properties:
 *         commentCreator:
 *           type: string
 *           description: Autor komentarza
 *         value:
 *           type: string
 *           description: Zawartość komentarza
 */

/**
 * @swagger
 * tags:
 *   name: posts
 */

/**
 * @swagger
 * /posts/getPostsByUsername/{username}:
 *   get:
 *     description: Poberanie postów użytkownika
 *     tags: [posts]
 *     parameters:
 *       - in: path
 *         name: username
 *         description: Nazwa użytkownika
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Pobrano posty użytkownika
 */

router.get("/getPostsByUsername/:username", getPostsByUsername);

/**
 * @swagger
 * /posts/getPostById/{id}:
 *   get:
 *     description: Pobieranie jednego postu po jego id
 *     tags: [posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Pobrano post
 *       404:
 *         description: Nie znaleziono postu
 */

router.get("/getPostById/:id", getPostById)

/**
 * @swagger
 * /posts/createPost:
 *   post:
 *     description: Tworzenie postu
 *     tags: [posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Utworzono post
 *       409:
 *         description: Nie utworzono postu konfilkt
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.post("/createPost", auth, createPost);

/**
 * @swagger
 * /posts/updatePost/{id}:
 *   patch:
 *     description: Aktualizowanie postu
 *     tags: [posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id postu
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Zaktualizowany post
 *       404:
 *         description: Nie znaleziono postu
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.patch("/updatePost/:id", auth, updatePost);

/**
 * @swagger
 * /posts/deletePost/{id}:
 *   delete:
 *     description: Usuwanie postu po jego id
 *     tags: [posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Usunięto post
 *       404:
 *         description: Nie znaleziono postu
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.delete("/deletePost/:id", auth, deletePost);

/**
 * @swagger
 * /posts/likePost/{id}:
 *   patch:
 *     description: Likowanie lub odlikowanie postu
 *     tags: [posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Zalikowano lub odlikowano pomyślnie
 *       404:
 *         description: Nie znaleziono postu
 *       401:
 *         description: Użytkownik nie zalogowany
 */

router.patch("/likePost/:id", auth, likePost);

/**
 * @swagger
 * /posts/commentPost/{id}:
 *   patch:
 *     description: Dodawanie komentarza po id postu
 *     tags: [posts]
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
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Dodano komentarz
 *       404:
 *         description: Nie znaleziono postu
 *       401:
 *         description: Użytkownik nie zalogowany
 *     
 */

router.patch("/commentPost/:id", auth, commentPost)

module.exports = router;
