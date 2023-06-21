import express from 'express';
import { verifyRegisterEmail } from '../controllers/verifyEmails.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: verifyEmails
 */

/**
 * @swagger
 * /emails/users/{id}/verify/{token}:
 *   get:
 *     description: Sprawdzanie czy użytkownik potwierdził rejestrację przez email
 *     tags: [verifyEmails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *       - in: path
 *         name: token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Rejestracja potwierdzona
 *       400:
 *         description: Niepoprawny link
 */

router.get("/users/:id/verify/:token", verifyRegisterEmail);

export default router;