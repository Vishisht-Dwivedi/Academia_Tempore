import express from "express";
import teachersApi from "./routes/teachersApi.js";
import classroomsApi from "./routes/classroomsApi.js"
import cors from "cors";
import mongoose from "mongoose";
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
app.use("/classrooms", classroomsApi);

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});
