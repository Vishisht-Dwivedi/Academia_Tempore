import dotenv from "dotenv";
import express from "express";
import teachersApi from "./routes/teachers/teachersApi.js";
import classroomRoutes from "./routes/classrooms/classroomRoutes.js"
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database");
} catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
}

const app = express();
const PORT = 3000;
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello world");
});
//Router routes
app.use("/teachers", teachersApi);
app.use("/classrooms", classroomRoutes);

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});
