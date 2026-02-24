import dotenv from "dotenv";
import { app } from "./api/app.js";
import connectDB from "./dbConnect/dbConnect.js";
dotenv.config();

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log(`Error: ${err.message}`);
});

