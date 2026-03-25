import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "../routes/user.route.js"
import imageRouter from "../routes/image.route.js"
import paymentRouter from "../routes/payment.route.js"
import paymentWebhook from "../utils/PaymentWebhook.js"
import { clerkMiddleware } from '@clerk/express'

const app = express()

// ✅ CORS
const allowedOrigins = ["http://localhost:5173", "https://what-remove-3wds-liard.vercel.app"];
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// ✅ 🔥 WEBHOOK FIRST (VERY IMPORTANT)
app.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  paymentWebhook
);

// ❗ AFTER webhook
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())
app.use(clerkMiddleware())

//routes
app.get("/", (req, res) => {
  res.json({ message: "Api is working!" });
});

app.use("/api/v1/users", userRouter)
app.use("/api/v1/image", imageRouter)
app.use("/api/v1/payment", paymentRouter)

export { app }