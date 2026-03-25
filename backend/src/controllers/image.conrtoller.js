import fs from "fs";
import User from "../models/user.model.js";
import { removeBackgroundFromImageFile } from "remove.bg";

const removeBgImage = async (req , res) => {
    try{
        const { userId } = req.auth();
        console.log("User ID from auth:", userId);

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image file provided" });
        }

        const user = await User.findOne({ clerkId: userId });

        if (!user){
            return res.status(404).json({ success : false, message: "User not found" });
        }

        if(user.credits === 0){
            fs.unlink(req.file.path, (err) => {
                if (err) console.error(err);
            });
            return res.status(200).json({ success : false, message: "Insufficient credits" });
        }

        if(!process.env.REMOVE_BG_API_KEY){
            console.error("REMOVE_BG_API_KEY is not set");
            fs.unlink(req.file.path, (err) => {
                if (err) console.error(err);
            });
            return res.status(500).json({ success: false, message: "Server configuration error" });
        }

        const imagepath = req.file.path;

        const result = await removeBackgroundFromImageFile({
            path: imagepath,
            apiKey: process.env.REMOVE_BG_API_KEY,
            size: "auto"
        });

        fs.unlink(req.file.path, (err) => {
             if (err) console.error(err);
        });

        user.credits -= 1;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Background removed successfully",
            credits: user.credits,
            image: result.base64img
        });


    }catch(error){
        console.error("Error removing background:", error);
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error(err);
            });
        }
        res.status(500).json({ success: false, error: error.message });
    }
}

export { removeBgImage };

