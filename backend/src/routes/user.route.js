import { Router } from "express";
const router = Router();

import { userData, clerkWebhook } from "../controllers/user.controller.js";

router.route("/").get(userData);
router.route("/webhooks").post(clerkWebhook);
router.route("/webhooks").get((req, res) => {
  res.json({ message: "This endpoint is for Clerk webhooks. Please send a POST request." });
});

export default router;