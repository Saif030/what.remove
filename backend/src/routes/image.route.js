import express from "express";
import { removeBgImage } from "../controllers/image.conrtoller.js";
import { requireAuth } from "@clerk/express";
import fileUpload from "../utils/FileUpload.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the Image API. Use POST /remove-bg to remove background from an image." });
});
router.post("/remove-bg", fileUpload.single("image"), requireAuth(), removeBgImage);

export default router;