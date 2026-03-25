import fs from "fs";
import { User } from "../models/user.model.js";
import { removeBackgroundFromImageFile } from "remove.bg";

const removeBgImage = async (req , res) => {
    try{
        const { clerkId } = req.body;

        const user = await User.findOne({ clerkId });

        if (!user){
            return res.status(404).json({ success : false, message: "User not found" });
        }

        if(user.credits === 0){
            return res.status(403).json({ success : false, message: "Insufficient credits" });
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
        res.status(500).json({ error: "Failed to remove background" });
    }
}

export { removeBgImage };

