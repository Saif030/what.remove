import { Router } from "express";
import { requireAuth } from "@clerk/express";
import express from "express";

const router = Router();

import { userData, clerkWebhook , userCredits } from "../controllers/user.controller.js";

router.route("/").get(userData);
router.route("/webhooks").post(express.raw({ type: "application/json" }), clerkWebhook);
router.route("/webhooks").get((req, res) => {
  res.json({ message: "This endpoint is for Clerk webhooks. Please send a POST request." });
});
router.route("/credits").get(requireAuth(),userCredits);

export default router;