import express from 'express';
import { paymentController } from '../controllers/payment.controller.js';
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.post('/payment-intent', requireAuth(), paymentController);

export default router;