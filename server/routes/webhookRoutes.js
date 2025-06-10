import express from 'express';
import { clerkWebhookHandler } from '../clerkWebhookHandler.js';

const router = express.Router();
router.post('/clerk-webhook', express.json(), clerkWebhookHandler);

export default router;
