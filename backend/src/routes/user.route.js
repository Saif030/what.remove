import { Router } from "express";
const router = Router();

import userData from "../controllers/user.controller.js";

router.route("/").get(userData);

export default router;