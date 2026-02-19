import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./dbConnect/dbConnect.js";
dotenv.config();



app.get("/", (req, res) => {
    res.send("Hello World!gsgs");
});

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log(`Error: ${err.message}`);
});

