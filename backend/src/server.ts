import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import {setupSwagger} from "./docs/swagger";
import eventsRoutes from "./routes/eventsRoutes";
import connectDB from './db/db';

dotenv.config();
const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:4173"],
        credentials: true,
    })
);
app.use(express.json());
setupSwagger(app)

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventsRoutes)

connectDB().
    then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
})
