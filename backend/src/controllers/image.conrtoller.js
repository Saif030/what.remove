import User from "../models/user.model.js";
import { removeBackgroundFromImageFile } from "remove.bg";

const removeBgImage = async (req , res) => {
    try{
        const { userId } = req.auth();

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image file provided" });
        }

        const user = await User.findOne({ clerkId: userId });

        if (!user){
            return res.status(404).json({ success : false, message: "User not found" });
        }

        if(user.credits === 0){
            return res.status(200).json({ success : false, message: "Insufficient credits" });
        }

        const { removeBackgroundFromImageBuffer } = removeBg;
        
        const result = await removeBackgroundFromImageFile({
            imagePath: req.file.path,
            apiKey: process.env.REMOVE_BG_API_KEY,
            size: "auto"
        });

        user.credits -= 1;
        await user.save();

        res.status(200).json({
            success: true,
            credits: user.credits,
            image: result.base64img
        });

    }catch(error){
        console.error("Error removing background:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export { removeBgImage };

