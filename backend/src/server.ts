import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import {setupSwagger} from "./docs/swagger";

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());
setupSwagger(app)

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.get("/api/health", (_req, res) => res.json({ ok: true }));


mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
        console.log("✅ Connected to MongoDB");
        app.listen(process.env.PORT || 5000, () => {
            console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => console.error("MongoDB connection error:", err));
