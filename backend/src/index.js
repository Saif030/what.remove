import dotenv from "dotenv";
dotenv.config();

import { app } from "./api/app.js";
import connectDB from "./dbConnect/dbConnect.js";

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log(`Error: ${err.message}`);
});

