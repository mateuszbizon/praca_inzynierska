import express from 'express';
import { verifyRegisterEmail } from '../controllers/verifyEmails.js';

const router = express.Router();

router.get("/users/:id/verify/:token", verifyRegisterEmail);

export default router;