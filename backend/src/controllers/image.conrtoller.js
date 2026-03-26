import  User from "../models/user.model.js";
import { removeBackgroundFromImageFile } from "remove.bg";

const removeBgImage = async (req, res) => {
  try {
    // ✅ FIX: call req.auth()
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No userId",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    // ✅ Check user
    const user = await User.findOne({ clerkId: userId });

    console.log("Clerk userId:", userId);
    console.log("DB user:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.credits <= 0) {
      return res.status(403).json({
        success: false,
        message: "Insufficient credits",
      });
    }

    if (!process.env.REMOVE_BG_API_KEY) {
      console.error("REMOVE_BG_API_KEY is not set");

      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    const result = await removeBackgroundFromImageFile({
      imageBuffer: req.file.buffer,  // Use buffer instead of file path
      apiKey: process.env.REMOVE_BG_API_KEY,
      size: "auto",
    });

    // ✅ update credits
    user.credits -= 1;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Background removed successfully",
      credits: user.credits,
      image: result.base64img,
    });

  } catch (error) {
    console.error("Error removing background:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to remove background",
    });
  }
};

export { removeBgImage };