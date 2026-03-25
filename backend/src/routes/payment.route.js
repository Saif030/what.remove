import express from 'express';
import { paymentController } from '../controllers/payment.controller.js';
import { requireAuth } from "@clerk/express";
import paymentWebhook from '../utils/PaymentWebhook.js';


const router = express.Router();

router.post('/payment-intent', requireAuth(), paymentController);
router.post('/webhook', express.raw({ type: "application/json" }), paymentWebhook);

export default router;