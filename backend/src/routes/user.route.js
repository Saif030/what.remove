import { Router } from "express";
const router = Router();

import { userData, clerkWebhook } from "../controllers/user.controller.js";

router.route("/").get(userData);
router.route("/clerk-webhook").post(clerkWebhook);

export default router;